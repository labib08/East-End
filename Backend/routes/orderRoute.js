import express from "express";
import { deleteOrderDetails, getOrderDetails, listOrders, placeOrder, userOrders, verifyOrder } from "../controllers/orderController.js";
import authenticateToken from "../middleWare/auth.js";

const orderRouter = express.Router();
orderRouter.post("/place", authenticateToken, placeOrder);
orderRouter.post("/details", authenticateToken, getOrderDetails);
orderRouter.post("/delete", authenticateToken, deleteOrderDetails);
orderRouter.post("/verify", authenticateToken,verifyOrder);
orderRouter.post("/userorders", authenticateToken, userOrders)
orderRouter.get("/listorders", listOrders)

export default orderRouter;