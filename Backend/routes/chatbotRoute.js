import express from "express";
import { handleChatbotMessage } from "../controllers/chatbotController.js";

const chatbotRouter = express.Router();

chatbotRouter.post('/chatbot', handleChatbotMessage);

export default chatbotRouter;