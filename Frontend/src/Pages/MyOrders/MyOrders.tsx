import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import orderPhoto from "../../Assets/order.jpeg";
interface Information {
    firstName: string,
    lastName: string,
    email: string,
    street: string,
    city: string,
    state: string,
    postcode: string,
    country: string,
    phone: string,
  }
  interface OrderItem {
    _id: string;
    name: string;
    image: string;
    price: number;
    description: string;
    type: string;
    __v: number;
    quantity: number;
  }

  interface Order {
    _id: string;
    userId: string;
    items: OrderItem[];
    amount: number;
    status: string;
    payment: boolean;
    date: Date;
    __v: number;
    address: Information;
  }
const MyOrders: React.FC = () => {
    const url = "https://east-end-backend.onrender.com";
    const token = localStorage.getItem('token');
    const [data, setData] = useState<Order[]>([]);

    const fetchOrders = useCallback(async () => {
        try {
            const response = await axios.post(`${url}/api/order/userorders`,{}, { headers: { token: token } });
            setData(response.data.data.reverse());
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }, [url, token]);

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [fetchOrders, token]);

    return (
        <div className='mt-[50px] mx-[70px] fade-in-cart'>
            <h2 className='font-bold text-[27px]'>My Orders</h2>
            <div className='flex flex-col gap-5 mt-8'>
                {data.map((order, index) => (
                    <div key={index} className='grid items-center grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr] gap-[30px] text-[14px] py-[10px] px-[20px] text-[#454545] border border-custom-red md:grid-cols-[1fr_2fr_1fr] md:gap-y-[5px] md:text-[12px]'>
                        <img className='w-[50px]' src={orderPhoto} alt="" />
                        <p> {order.items.map((item, index) => {
                            if (index === order.items.length -1) {
                                return item.name + " x " +item.quantity
                            }
                            else {
                                return item.name + " x " +item.quantity+", "
                            }
                        })} </p>
                        <p>${order.amount.toFixed(1)}</p>
                        <p>Items: {order.items.length}</p>
                        <p><span className='font-[500] text-[#454545]'>&#x25cf;</span> <b>{order.status}</b></p>
                        <button onClick ={fetchOrders} className='border-none text-[14px] py-[12px] px-0 rounded-[50px] bg-[rgb(92,22,22)] text-white cursor-pointer transition ease-in-out duration-300 hover:bg-[rgb(120,30,30)] md:text-[10px]'> Track Order</button>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default MyOrders