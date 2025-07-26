import express from "express";

import { authSeller } from "../middlewares/authSeller.js";
import {
  addProduct,
  changeStock,
  getProductById,
  getProducts,
} from "../controller/product.controller.js";
import { upload } from "../config/multer.js";
import {
  updateProduct,
  deleteProduct,
} from "../controller/product.controller.js";


const router = express.Router();

router.post("/add-product", authSeller, upload.array("image", 4), addProduct);
router.get("/list", getProducts);
router.get("/id", getProductById);
router.post("/stock", authSeller, changeStock);
router.put("/:id", authSeller, updateProduct);
router.delete("/:id", authSeller, deleteProduct);

export default router;
