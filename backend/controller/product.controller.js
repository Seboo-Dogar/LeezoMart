import Product from "../models/product.model.js";
import cloudinary from "../config/cloudinary.js";


// Upload helper function
const uploadToCloudinary = async (fileBuffer, originalname) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: "products",
        public_id: `${Date.now()}_${originalname.split(".")[0]}`,
        resource_type: "image",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    ).end(fileBuffer);
  });
};

// add product :/api/product/add
// POST: Add Product
export const addProduct = async (req, res) => {
  try {
    const { name, price, offerPrice, description, category } = req.body;
    const files = req.files;

    if (!name || !price || !offerPrice || !description || !category || !files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "All fields including images are required",
      });
    }

    // Upload images to Cloudinary
    const imageUploadPromises = files.map((file) =>
      uploadToCloudinary(file.buffer, file.originalname)
    );
    const imageUrls = await Promise.all(imageUploadPromises);

    const product = new Product({
      name,
      price,
      offerPrice,
      description,
      category,
      image: imageUrls,
    });

    const savedProduct = await product.save();

    return res.status(201).json({
      success: true,
      product: savedProduct,
      message: "Product added successfully",
    });
  } catch (error) {
    console.error("Error in addProduct:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while adding product",
    });
  }
};

// get products :/api/product/get
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// get single product :/api/product/id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    res.status(200).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// change stock  :/api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      { inStock },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, product, message: "Stock updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// PUT update product
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Update failed", error: error.message });
  }
};


// DELETE product
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error deleting product",
      error: error.message,
    });
  }
};

