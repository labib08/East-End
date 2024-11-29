import express from "express";
import { addToCart, deleteCart, removeFromCart } from "../controllers/cartController.js";
import authenticateToken from "../middleWare/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add", authenticateToken, addToCart);
cartRouter.post("/remove", authenticateToken, removeFromCart);
cartRouter.post("/delete", authenticateToken, deleteCart);

export default cartRouter;