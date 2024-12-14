import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

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
    <form onSubmit={handleSubmit} className="flex items-start justify-between gap-[50px] mt-[100px] w-[90%] max-w-[1200px] my-[100px] mx-auto fade-in-cart md-sm:flex md-sm:flex-col md-sm:justify-center md-sm:items-center">
      <div className="w-[45%] max-w-[500px] md-sm:w-full md-sm:max-w-[500px]">
        <p className="title text-[30px] font-semibold mb-[50px]">Delivery Information</p>
        <div className="flex gap-[10px]">
          <input className="mb-[15px] w-full p-[10px] border border-[#868484] rounded-[50px] focus:outline-[rgb(92,22,22)]" required name='firstName' onChange={onChangeHandler} value={formData.firstName} type="text" placeholder="First Name" />
          <input className="mb-[15px] w-full p-[10px] border border-[#868484] rounded-[50px] focus:outline-[rgb(92,22,22)]" required name='lastName' onChange={onChangeHandler} value={formData.lastName} type="text" placeholder="Last Name" />
        </div>
        <input className="mb-[15px] w-full p-[10px] border border-[#868484] rounded-[50px] focus:outline-[rgb(92,22,22)]" required name='email' onChange={onChangeHandler} value={formData.email} type="email" placeholder="Email address" />
        <input className="mb-[15px] w-full p-[10px] border border-[#868484] rounded-[50px] focus:outline-[rgb(92,22,22)]" required name='street' onChange={onChangeHandler} value={formData.street} type="text" placeholder="Street" />
        <div className="flex gap-[10px]">
          <input className="mb-[15px] w-full p-[10px] border border-[#868484] rounded-[50px] focus:outline-[rgb(92,22,22)]" required name='city' onChange={onChangeHandler} value={formData.city} type="text" placeholder="City" />
          <input className="mb-[15px] w-full p-[10px] border border-[#868484] rounded-[50px] focus:outline-[rgb(92,22,22)]" required name='state' onChange={onChangeHandler} value={formData.state} type="text" placeholder="State" />
        </div>
        <div className="flex gap-[10px]">
          <input className="mb-[15px] w-full p-[10px] border border-[#868484] rounded-[50px] focus:outline-[rgb(92,22,22)]" required name='postcode' onChange={onChangeHandler} value={formData.postcode} type="text" placeholder="Post code" />
          <input className="mb-[15px] w-full p-[10px] border border-[#868484] rounded-[50px] focus:outline-[rgb(92,22,22)]" required name='country' onChange={onChangeHandler} value={formData.country} type="text" placeholder="Country" />
        </div>
        <input className="mb-[15px] w-full p-[10px] border border-[#868484] rounded-[50px] focus:outline-[rgb(92,22,22)]" required name='phone' onChange={onChangeHandler} value={formData.phone} type="text" placeholder="Phone" />
      </div>
      <div className="w-[45%] max-w-[500px] md-sm:w-full md-sm:max-w-[500px]">
        <div className="cart-total flex-1 flex flex-col gap-[20px]">
          <h2 className="text-[30px] font-[600]">Cart Totals</h2>
          <div>
            <div className="flex justify-between text-[#555] mt-[20px]">
              <p>Subtotal</p>
              <p>${(2).toFixed(1)}</p>
            </div>
            <hr className="h-[1px] bg-[#c6c5c5] border-none my-[20px]"/>
            <div className="flex justify-between text-[#555] mt-[20px]">
              <p>Delivery Fee</p>
              <p>${(2).toFixed(1)}</p>
            </div>
            <hr className="h-[1px] bg-[#c6c5c5] border-none my-[20px]"/>
            <div className="flex justify-between text-[#555] mt-[20px]">
              <b>Total</b>
              <b>${(2).toFixed(1)}</b>
            </div>
          </div>
          <button type='submit' className="border-none text-white bg-[rgb(92,22,22)] w-[max(15vw,200px)] py-[12px] px-0 rounded-[75px] cursor-pointer">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>

  )
}

export default Order