import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import './Order.css';

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

const Order = () => {
  const token = localStorage.getItem('token');
  const url = "http://localhost:5000";
  const [formData, setFormData] = useState<Information>({
    firstName:"",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state:"",
    postcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]:value});
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let response = await axios.post(`${url}/api/order/place`, {formData}, {headers:{token}})
    if (response.data.success) {
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else {
      toast.error(response.data.message);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate('/cart');
    }

  }, [token, navigate])

  return (
    <form onSubmit={handleSubmit} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={formData.firstName} type="text" placeholder="First Name" />
          <input required name='lastName' onChange={onChangeHandler} value={formData.lastName} type="text" placeholder="Last Name" />
        </div>
        <input required name='email' onChange={onChangeHandler} value={formData.email} type="email" placeholder="Email address" />
        <input required name='street' onChange={onChangeHandler} value={formData.street} type="text" placeholder="Street" />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={formData.city} type="text" placeholder="City" />
          <input required name='state' onChange={onChangeHandler} value={formData.state} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required name='postcode' onChange={onChangeHandler} value={formData.postcode} type="text" placeholder="Post code" />
          <input required name='country' onChange={onChangeHandler} value={formData.country} type="text" placeholder="Country" />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={formData.phone} type="text" placeholder="Phone" />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${(2).toFixed(1)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${(2).toFixed(1)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${(2).toFixed(1)}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>

  )
}

export default Order