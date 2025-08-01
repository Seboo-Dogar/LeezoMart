import express from "express";
import authUser from "../middlewares/authUser.js";
import {
  getAllOrders,
  getUserOrders,
  placeOrderCOD,
  placeOrderStripe,
  updateOrderStatus,
} from "../controller/order.controller.js";
import { authSeller } from "../middlewares/authSeller.js";

const router = express.Router();

router.post("/cod", authUser, placeOrderCOD);
router.post("/stripe", authUser, placeOrderStripe);
router.get("/user", authUser, getUserOrders);
router.get("/seller", authSeller, getAllOrders);
router.put("/:orderId/status", authSeller, updateOrderStatus);

export default router;
