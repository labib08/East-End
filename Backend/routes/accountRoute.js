import express from "express";
import { createAccount, loginUser } from "../controllers/accountController.js";

const userRouter = express.Router();

userRouter.post("/create", createAccount);
userRouter.post("/login", loginUser);

export default userRouter;