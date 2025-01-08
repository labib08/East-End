import axios from "axios";
import fs from "fs";
import Fuse from "fuse.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const qaFilePath = path.join(__dirname, '..', 'Data', 'qa.json');
let qaData = {};

try {
    const data = fs.readFileSync(qaFilePath, 'utf8');
    qaData = JSON.parse(data);
} catch (err) {
    console.log(err);
}

const fuse = new Fuse(Object.keys(qaData), {
    includeScore: true,
    threshold: 0.4,
    ignoreLocation: true,
    keys: []
});


let storedOrders = [];
const handleOrderChat = async (req, res) => {
    try {
        const { orders } = req.body;

        if (orders && orders.length > 0) {

            console.log("Request from chat.py - storing orders");
            console.log(orders);
            storedOrders = orders;
            return res.json({ success: true, message: "Orders stored successfully" });
        } else {
            console.log("Request from frontend - sending stored orders");
            if (storedOrders.length > 0) {
                console.log("Sending already stored orders")
                res.json({ success: true, data: storedOrders });
                storedOrders = [];
                return;
            } else {
                console.log("No orders available")
                return res.json({ success: false, message: "No orders available" });
            }
        }
    } catch (err) {
        console.log(err);
        return res.json({ success: false, message: "Error" });
    }
};

const handleChat = async(req, res) => {
    try {
        const userMessage = req.body.message;
        const response = await axios.post('http://127.0.0.1:4000/chat', { message: userMessage });
        res.json(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Something went wrong with the chatbot' });
    }
}

const handleChatbotMessage = async (req, res) => {
    const userMessage = req.body.message ? req.body.message.toLowerCase().trim() : '';
    if (!userMessage) {
        return res.json({success: false, reply: "Please ask a question."});
    }
    const results = fuse.search(userMessage);
    if (results.length>0 && results[0].score<0.5) {
        const matchedQuestion = results[0].item;
        const answer = qaData[matchedQuestion];
        return res.json({success:true, reply: answer});
    }
    else {
        return res.json({reply: "I'm sorry, I don't understand that question. Here are some things you can ask me:\n- How to Signup and Login\n- Why cannot I order\n- How to make payment\n- How to Login\n- How to Logout" });
    }
};

export { handleChat, handleChatbotMessage, handleOrderChat };

