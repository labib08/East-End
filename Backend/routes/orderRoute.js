import express from "express";
import { deleteOrderDetails, getOrderDetails, placeOrder } from "../controllers/orderController.js";
import authenticateToken from "../middleWare/auth.js";

const orderRouter = express.Router();
orderRouter.post("/place", authenticateToken, placeOrder);
orderRouter.post("/details", authenticateToken, getOrderDetails);
orderRouter.post("/delete", authenticateToken, deleteOrderDetails);

export default orderRouter;