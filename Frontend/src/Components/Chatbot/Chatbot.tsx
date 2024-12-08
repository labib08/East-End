import React, { useState } from 'react';

interface Message {
    text: string;
    sender: 'user' | 'bot';
}

const Chatbot: React.FC = () => {
    const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const toggleChatWindow = () => {
        setIsChatOpen((prev) => !prev);
    };

    const handleSendMessage = () => {
        if (inputValue.trim() === '') return;

        const userMessage: Message = { text: inputValue.trim(), sender: 'user' };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInputValue('');
        setLoading(true);

        setTimeout(() => {
            const botMessage: Message = { text: 'This is a bot response.', sender: 'bot' };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="chat-bot">
            <button className="chatbot-button" onClick={toggleChatWindow}>
                💬
            </button>
            {isChatOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <span>Chatbot</span>
                        <button className="close-button" onClick={toggleChatWindow}>
                            ✖
                        </button>
                    </div>
                    <div className="chat-body">
                        {messages.map((message, index) => (
                            <div key={index} className={`chat-message ${message.sender}`}>
                                {message.text}
                            </div>
                        ))}
                        {loading && <div className="chat-message bot">Typing...</div>}
                    </div>
                    <div className="chat-footer">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type your question..."
                        />
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
