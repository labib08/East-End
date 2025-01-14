import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";

interface Message {
  text: string;
  sender: 'user' | 'bot';
}
interface Items {
  _id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  type: string;
}

type OrderItem = Items & { quantity: number };

const Chatbot: React.FC = () => {
  const url = "http://localhost:5000";
  const navigate = useNavigate();
  const firstMessage: Message = { text: "Would you like to order?", sender: 'bot' };
  const token = localStorage.getItem('token');
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([firstMessage]);
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [cost, setCost] = useState<number>(0.0)

  const [mode, setMode] = useState<string>('isOrder');

  const [cartItems, setCartItems] = useState<Record<string, number>>({});
  const [itemData, setItemData] = useState<Items[]>([]);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  const handleSeatSelection = (seat: string): void => {
    setSelectedTable(seat);
  };

  const confirmSeatSelection = async() => {
    if (selectedTable) {
      setMode('type')
      const seatMessage: Message = { text: `Seat number ${selectedTable} selected`, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, seatMessage]);
      let response = await order();
      if (response.data.success) {
        let response = await axios.post(`${url}/api/order/place`, {selectedTable}, {headers:{token}})
        if (response.data.success) {
          const {session_url} = response.data;
          window.location.replace(session_url);
        }
        else {
          setLoading(true);
          setTimeout(() => {
            const orderMessage: Message = { text: "An error occurred please try again.", sender: 'bot' };
            setMessages((prevMessages) => [...prevMessages, orderMessage]);
            setLoading(false);
          }, 500);
        }
      }
      else {
        setLoading(true);
        setTimeout(() => {
          const orderMessage: Message = { text: "An error occurred please try again.", sender: 'bot' };
          setMessages((prevMessages) => [...prevMessages, orderMessage]);
          setLoading(false);
        }, 500);
      }
    } else {
      const errorMessage: Message = { text: "Please select a valid seat number", sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  const getItemList = async() => {
    const response = await axios.get(`${url}/api/item/list`);
    setItemData(response.data.data|| {});
  }

  const getChatOrders = async () => {
    const response = await axios.post(`${url}/api/chatbot/orders`);

    if (response.data.success) {
      setMode("confirm order")
      const transformedCartItems = response.data.data.reduce((acc: Record<string, number>, item: { quantity: number; item_id: string }) => {
        acc[item.item_id] = (acc[item.item_id] || 0) + item.quantity;
        return acc;
      }, {});
      setCartItems(transformedCartItems);

    }
    else {
      console.log("Error fetching order")
    }
  }

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const toggleChatWindow = () => {
    setIsChatOpen((prev) => !prev);
  };
  const handleDineIn = async () => {
    const dineInMessage: Message = { text: "Dine In", sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, dineInMessage]);
    const seatNumMessage: Message = { text: "Please select a seat number", sender: 'bot' };
    setMessages((prevMessages) => [...prevMessages, seatNumMessage]);
    setMode('seatNum')

  }
  const order = async() => {
    await axios.post(`${url}/api/order/delete`, {}, {headers: {token}})
      const orderItems: OrderItem[] = itemData
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        ...item,
        quantity: cartItems[item._id],
      }));

      const orderData = {
        items: orderItems,
        amount: cost + 2,
      };
      console.log(orderData);
      const response = await axios.post(`${url}/api/order/details`, orderData, {headers:{token}})
      return response;
  }
  const handleDelivery = async() => {
    const deliveryMessage: Message = { text: "Delivery", sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, deliveryMessage]);
    setMode('type')
    const response = await order();
    if (response.data.success) {
      navigate('/order');
    }
    else {
      setLoading(true);
      setTimeout(() => {
        const orderMessage: Message = { text: "An error occurred please try again.", sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, orderMessage]);
        setLoading(false);
      }, 500);
    }
  }
  const handlePayClick = async() => {
    //setMode('type')
    if (token) {
      setMode('dine in or delivery')
      const yesOrderMessage: Message = { text: "Yes", sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, yesOrderMessage]);
      setLoading(true);
        setTimeout(() => {
          const orderMessage: Message = { text: "Dine-In or Delivery?", sender: 'bot' };
          setMessages((prevMessages) => [...prevMessages, orderMessage]);
          setLoading(false);
        }, 500);
    }
    else {
      setMode('type')
      setLoading(true);
      setTimeout(() => {
        const orderMessage: Message = { text: "Please log in before ordering.", sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, orderMessage]);
        setLoading(false);
      }, 500);
    }

  }

  const handleConfirmClick = () => {
    setMode("proceed to payment")

    const userMessage: Message = { text: "yes", sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    const totalCost = cartItems
    ? Object.keys(cartItems).reduce((total, id) => {
        const item = itemData.find((item) => item._id === id);
        if (item) {
          total += item.price * cartItems[id];
        }
        return total;
      }, 0)
    : 0;
    setCost(totalCost)
    setLoading(true);
    setTimeout(() => {
    const formattedString = itemData
    .filter((item) => cartItems[item._id] > 0)
    .map(
      (item) =>
        `${item.name}:$${item.price.toFixed(1)} x ${cartItems[item._id]}`
    )
    .join(', ');

    const yesOrderMessage: Message = { text: `Order Summary: ${formattedString} Total: $${totalCost.toFixed(1)}. Would you like to proceed to payment?`, sender: 'bot' };

    setMessages((prevMessages) => [...prevMessages, yesOrderMessage]);
    setLoading(false);
  }, 0);

  }
  const handleSendMessage = async () => {

    if (inputValue.trim() === '') return;

    const userMessage: Message = { text: inputValue.trim(), sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue('');
    setLoading(true);

    const response = await axios.post(`${url}/api/chatbot/chat`, { message: inputValue });

    const botReply = response.data.answer;

    setTimeout(() => {
      const botMessage: Message = { text: botReply, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setLoading(false);
    }, 500);
    getChatOrders();
  };

  const handleYesClick = async(firstOrder: boolean) => {
    //console.log(itemData)
    setMode('type');
    const yesOrderMessage: Message = firstOrder
    ? { text: "Yes", sender: 'user' }
    : { text: "I'd like to reorder", sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, yesOrderMessage]);
    setLoading(true);

    const response = await axios.post(`${url}/api/chatbot/chat`, { message: "order" });

    const botReply = response.data.answer;

    setTimeout(() => {
      const botMessage: Message = { text: botReply, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setLoading(false);
    }, 500);
  };

  const handleNoClick = () => {
    setMode('type');
    const noOrderMessage: Message = { text: "No", sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, noOrderMessage]);
    setLoading(true);
    setTimeout(() => {
      const orderMessage: Message = { text: "Hey!", sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, orderMessage]);
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  useEffect(() => {
    getItemList();
  }, []);
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

          <div className="flex-1 overflow-y-auto flex flex-col p-[10px] gap-[5px]">
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
            <div ref={messagesEndRef}></div>
          </div>
          {mode === "type" && (
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
          )}
          {mode === "isOrder" && (
            <div className="flex justify-center p-[10px] border-t border-[#ddd] bg-white">
              <button
                className="bg-[rgb(92,22,22)] text-white px-[15px] py-[5px] rounded-[5px] mx-[5px] cursor-pointer hover:bg-[rgb(122,22,22)]"
                onClick={() => handleYesClick(true)}
              >
                Yes
              </button>
              <button
                className="bg-[rgb(92,22,22)] text-white px-[15px] py-[5px] rounded-[5px] mx-[5px] cursor-pointer hover:bg-[rgb(122,22,22)]"
                onClick={handleNoClick}
              >
                No
              </button>
            </div>
          )}
          {mode === "confirm order" && (
            <div className="flex justify-center p-[10px] border-t border-[#ddd] bg-white">
              <button
                className="bg-[rgb(92,22,22)] text-white px-[15px] py-[5px] rounded-[5px] mx-[5px] cursor-pointer hover:bg-[rgb(122,22,22)]"
                onClick={handleConfirmClick}
              >
                Confirm
              </button>
              <button
                className="bg-[rgb(92,22,22)] text-white px-[15px] py-[5px] rounded-[5px] mx-[5px] cursor-pointer hover:bg-[rgb(122,22,22)]"
                onClick={() => handleYesClick(false)}
              >
                Reorder
              </button>
            </div>
          )}
          {mode === "proceed to payment" && (
            <div className="flex justify-center p-[10px] border-t border-[#ddd] bg-white">
              <button
                className="bg-[rgb(92,22,22)] text-white px-[15px] py-[5px] rounded-[5px] mx-[5px] cursor-pointer hover:bg-[rgb(122,22,22)]"
                onClick={handlePayClick}
              >
                Pay
              </button>
              <button
                className="bg-[rgb(92,22,22)] text-white px-[15px] py-[5px] rounded-[5px] mx-[5px] cursor-pointer hover:bg-[rgb(122,22,22)]"
                onClick={() => handleYesClick(false)}
              >
                Reorder
              </button>
            </div>
          )}
          {mode === "dine in or delivery" && (
            <div className="flex justify-center p-[10px] border-t border-[#ddd] bg-white">
              <button
                className="bg-[rgb(92,22,22)] text-white px-[15px] py-[5px] rounded-[5px] mx-[5px] cursor-pointer hover:bg-[rgb(122,22,22)]"
                onClick={handleDineIn}
              >
                Dine In
              </button>
              <button
                className="bg-[rgb(92,22,22)] text-white px-[15px] py-[5px] rounded-[5px] mx-[5px] cursor-pointer hover:bg-[rgb(122,22,22)]"
                onClick={handleDelivery}
              >
                Delivery
              </button>
            </div>
          )}
          {mode === "seatNum" && (
        <div className="flex flex-col items-center p-[10px] border-t border-[#ddd] bg-white">
          <p className="mb-[10px] text-[14px] font-medium">Select a seat number:</p>
          <select
            value={selectedTable ?? ""}
            onChange={(e) => handleSeatSelection(e.target.value)}
            className="border border-[#ddd] rounded-[5px] p-[5px] text-[14px] w-[160px] text-center"
          >
            <option value="" disabled>
              Select seat number
            </option>
            {Array.from({ length: 20 }, (_, i) => (
              <option key={i + 1} value={String(i + 1)}>
                {i + 1}
              </option>
            ))}
          </select>
          <button
            className="bg-[rgb(92,22,22)] text-white px-[15px] py-[5px] rounded-[5px] mx-[5px] cursor-pointer hover:bg-[rgb(122,22,22)] mt-[10px]"
            onClick={confirmSeatSelection}
          >
            Confirm
          </button>
        </div>
      )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;