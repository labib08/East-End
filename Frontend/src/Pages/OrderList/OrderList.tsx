import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
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
  address?: Information;
}
const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const url = "http://localhost:5000";

  const fetchAllOrders = async () => {
    const response = await axios.get(`${url}/api/order/listorders`)
    if (response.data.success) {
      setOrders(response.data.data);
    }
    else {
      toast.error(response.data.message);
    }
  }

  const statusHandler = async (e: React.ChangeEvent<HTMLSelectElement>, orderId: string) => {
    const response = await axios.post(`${url}/api/order/status`,{
      orderId,
      status: e.target.value,
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  }

  useEffect(()=>{
    fetchAllOrders();
  }, [])
  return (
    <div>
      <h3 className="font-[600]">Order Page</h3>
      <div>
        {orders
          .filter(order => order.address)
          .map((order, index) => (
            <div
              key={index}
              className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr] items-start gap-[30px] border border-[rgb(92,22,22)] p-[20px] my-[30px] text-[14px] text-[#505050] md-lg:text-[12px] md-lg:grid-cols-[0.5fr_2fr_1fr] md-lg:py-[15px] md-lg:px-[8px]"
            >
              <img className="w-[500px] md-lg:w-[40px]" src={orderPhoto} alt="" />
              <div>
                <p className="font-[600]">
                  {order.items.map((item, i) =>
                    i === order.items.length - 1
                      ? item.name + " x " + item.quantity
                      : item.name + " x " + item.quantity + ", "
                  )}
                </p>
                <p className="mt-[30px] mb-[5px] font-[600]">
                  {`${order.address?.firstName} ${order.address?.lastName}`}
                </p>
                <div className="mb-[10px]">
                  <p>{order.address?.street + ", "}</p>
                  <p>
                    {`${order.address?.city}, ${order.address?.state}, ${order.address?.country}, ${order.address?.postcode}`}
                  </p>
                </div>
                <p>{order.address?.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>${order.amount ? order.amount.toFixed(1) : "0.0"}</p>
              <select
                onChange={(e) => statusHandler(e, order._id)}
                value={order.status}
                className="bg-[#ffe8e4] border border-[rgb(92,22,22)] w-[max(16.2vw,120px)] p-[10px] text-[14px] outline-none md-lg:p-[5px] md-lg:text-[12px]"
              >
                <option value="Restaurant is making the item">Restaurant is making the item</option>
                <option value="Rider has picked up the order">Rider has picked up the order</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
      </div>
    </div>

      )
    }

export default OrderList