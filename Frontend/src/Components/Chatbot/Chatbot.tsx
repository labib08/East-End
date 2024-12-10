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
    <div className="fixed bottom-[20px] right-[20px] font-sans z-[1000]">
      <button
        className="bg-[rgb(92,22,22)] text-white border-none rounded-full w-[50px] h-[50px] p-0 flex items-center justify-center cursor-pointer"
        onClick={toggleChatWindow}
      >
        💬
      </button>
      {isChatOpen && (
        <div className="bg-white border border-[#ddd] rounded-[10px] shadow-[0_4px_8px_rgba(0,_0,_0,_0.1)] w-[300px] fixed bottom-[70px] right-[20px] flex flex-col h-[400px]">
          <div className="bg-[rgb(92,22,22)] text-white p-[10px] font-bold flex justify-between items-center">
            <span>Chatbot</span>
            <button className="text-white" onClick={toggleChatWindow}>
              ✖
            </button>
          </div>

          <div className="flex-1 overflow-y-auto flex flex-col justify-end p-[10px] gap-[5px]">
            {messages.map((message, index) => (
                <div
                key={index}
                className={`my-[5px] ${
                    message.sender === 'user' ? 'text-right text-[#460303]' : 'text-left text-black'
                }`}
                >
                {message.text}
                </div>
            ))}
            {loading && <div className="text-left text-black">Typing...</div>}
        </div>

          <div className="flex p-[10px] border-t border-[#ddd] bg-white">
            <input
              type="text"
              className="flex-1 p-[5px] border border-[#ddd] rounded-[5px] text-[#460303]"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your question..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
            />
            <button
              onClick={handleSendMessage}
              className="ml-[5px] bg-[rgb(92,22,22)] text-white border-0 rounded-[5px] px-[10px] py-[5px] cursor-pointer"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
