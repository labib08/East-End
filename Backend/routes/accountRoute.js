import express from "express";
import { createAccount, isAdmin, loginUser } from "../controllers/accountController.js";
import authenticateToken from "../middleWare/auth.js";

const userRouter = express.Router();

userRouter.post("/create", createAccount);
userRouter.post("/login", loginUser);
userRouter.post("/isadmin", authenticateToken, isAdmin);

export default userRouter;