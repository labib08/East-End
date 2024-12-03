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
    const url = "http://localhost:5000";
    const token = localStorage.getItem('token');
    const [data, setData] = useState<Order[]>([]);

    const fetchOrders = useCallback(async () => {
        try {
            const response = await axios.post(
                `${url}/api/order/userorders`,{}, { headers: { token: token } });
            setData(response.data.data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }, [url, token, data]);

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [fetchOrders, token]);

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className='container'>
                {data.map((order, index) => (
                    <div key={index} className='my-orders-order'>
                        <img src={orderPhoto} alt="" />

                    </div>
                ))}
            </div>
        </div>
    );
};


export default MyOrders