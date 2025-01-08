import express from "express";
import { handleChat, handleChatbotMessage, handleOrderChat } from "../controllers/chatbotController.js";

const chatbotRouter = express.Router();

chatbotRouter.post('/chatbot', handleChatbotMessage);
chatbotRouter.post('/chat', handleChat);
chatbotRouter.post('/orders', handleOrderChat);

export default chatbotRouter;