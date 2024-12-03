import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const url = "http://localhost:5000";
  const fetchAllOrders = async () => {
    const response = await axios.get(`${url}/api/order/listorders`)
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(orders)
    }
    else {
      toast.error(response.data.message);
    }
  }

  return (
    <div>Order</div>
  )
}

export default OrderList