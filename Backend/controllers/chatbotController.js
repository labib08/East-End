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

export { handleChatbotMessage };

