import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import stripePackage from "stripe";

// Stripe instance (created only once)

// Helper to calculate total price with tax
const calculateTotalAmount = async (items) => {
  let total = 0;
  await Promise.all(
    items.map(async (item) => {
      const product = await Product.findById(item.product).lean();
      if (!product) throw new Error("Product not found");
      total += product.offerPrice * item.quantity;
    })
  );
  const tax = Math.floor((total * 2) / 100); // 2% tax
  return total + tax;
};

// ==============================
// 1. Place Order - Cash on Delivery
// ==============================
export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.user;
    const { items, address } = req.body;

    if (!address || !items || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid order details", success: false });
    }

    const amount = await calculateTotalAmount(items);

    await Order.create({
      userId,
      items,
      address,
      amount,
      paymentType: "COD",
      isPaid: false,
    });

    res
      .status(201)
      .json({ message: "Order placed successfully", success: true });
  } catch (error) {
    console.error("COD Order Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ==============================
// 2. Place Order - Stripe Payment
// ==============================
export const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.user;
    const { items, address } = req.body;
    const { origin } = req.headers;
    const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);


    if (!address || !items || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid order details", success: false });
    }

    let amount = 0;
    const productData = [];

    await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.product).lean();
        if (!product) throw new Error("Product not found");

        amount += product.offerPrice * item.quantity;
        productData.push({
          name: product.name,
          price: product.offerPrice,
          quantity: item.quantity,
        });
      })
    );

    // Add tax
    amount += Math.floor((amount * 2) / 100);

    // Create Stripe line items
    const line_items = productData.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.floor(item.price * 100), // Stripe expects amount in cents
      },
      quantity: item.quantity,
    }));

    // Create unpaid order first (optional: set isPaid: false)
    const order = await Order.create({
      userId,
      items,
      address,
      amount,
      paymentType: "Online",
      isPaid: false,
    });

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
        userId,
      },
    });

    res.status(201).json({
      message: "Order initiated successfully",
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe Order Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ==============================
// 3. Get Orders for a User
// ==============================
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user;
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("User Orders Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ==============================
// 4. Get All Orders (Admin)
// ==============================
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Admin Orders Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["Order Placed", "Shipped", "Delivered", "Cancelled"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status", success: false });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found", success: false });
    }

    order.status = status;

    if (status === "Delivered" && order.paymentType === "COD") {
      order.isPaid = true;
    }
    
    await order.save();

    res.status(200).json({ message: "Order status updated", success: true });
  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
