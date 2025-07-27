import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Orders = () => {
  const noProduct =
    "https://qfautomation.b-cdn.net/uploads/no-product-found.png";

  const [orders, setOrders] = useState([]);
  const { axios } = useContext(AppContext);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/seller");
      console.log("data", data);

      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="md:p-10 p-4 space-y-4">
      <h2 className="text-lg font-medium">Orders List</h2>

      {orders.map((order, index) => (
        <div
          key={index}
          className="flex flex-col gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800"
        >
          {/* Items List */}
          <div className="flex flex-col gap-3">
            {order.items.map((item, i) => (
              <div key={i} className="flex gap-4 items-center">
                <img
                  className="w-12 h-12 object-cover rounded opacity-60"
                  src={item?.product?.image?.[0] || noProduct}
                  alt={item?.product?.name || "Product Image"}
                />
                <div>
                  <p className="font-medium">
                    {item?.product?.name || (
                      <span className="text-red-500">[Missing Product]</span>
                    )}
                    {item.quantity > 1 && (
                      <span className="text-indigo-500"> x {item.quantity}</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Address Info */}
          <div className="text-sm">
            <p className="font-medium mb-1">
              {order.address.firstName} {order.address.lastName}
            </p>
            <p>
              {order.address.street}, {order.address.city},{" "}
              {order.address.state}, {order.address.zipCode},{" "}
              {order.address.country}
            </p>
            <p>Phone: {order.address.phone}</p>
            <p>Email: {order.address.email}</p>
          </div>

          {/* Order Summary */}
          <div className="flex justify-between flex-wrap gap-4 text-sm pt-2 border-t border-gray-200 mt-4">
            <p className="font-medium text-black/70">
              Total Amount: ${order.amount}
            </p>
            <p>Payment Method: {order.paymentType}</p>
            <p>Status: {order.status}</p>
            <p>
              Payment:{" "}
              <span className={order.isPaid ? "text-green-600" : "text-red-600"}>
                {order.isPaid ? "Paid" : "Pending"}
              </span>
            </p>
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
