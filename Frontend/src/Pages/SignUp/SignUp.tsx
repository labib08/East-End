import axios from "axios";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import bgImg from '../../Assets/signup-background-5.jpg';
interface FormData {
  name: string;
  email: string;
  password: string;
}
const SignUp: React.FC = () => {
  const url = "http://localhost:5000";
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: ''
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await axios.post(`${url}/api/user/create`, formData);
    if (response.data.success) {
      toast.success(response.data.message);
    }
    else {
      toast.error(response.data.message);
    }
  }
  const backgroundStyle: React.CSSProperties = {
    backgroundImage: `url(${bgImg})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  }
  return (
    <div
      className="w-full h-screen bg-cover bg-center flex justify-center items-center mb-[-40px]"
      style={backgroundStyle}
    >
      <div className='w-full max-w-[600px] p-[40px_60px] bg-transparent border-0 text-center transition-[all_0.3s] fade-in-signup sm:p-[20px] max-sm:px-[30px]'>
        <h1 className='text-[68px] text-white font-medium mb-[30px] max-sm:text-[32px] max-sm:font-[500] '>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-5 mb-5 bg-none'>
            <input
              type="text"
              placeholder='Name'
              name='name'
              value={formData.name}
              className='h-[70px] p-[10px] text-[22px] text-white font-bold border-[2.5px] border-[#fffefe] rounded-[35px] w-[calc(100%-22px)] bg-transparent max-sm:w-full md:w-auto'
              onChange={handleChange}
              required
            />

            <input
              type="email"
              placeholder='Email Address'
              name='email'
              value={formData.email}
              className='h-[70px] p-[10px] text-[22px] text-white font-bold border-[2.5px] border-[#fffefe] rounded-[35px] w-[calc(100%-22px)] bg-transparent max-sm:w-full md:w-auto'
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder='Password'
              name='password'
              value={formData.password}
              className='h-[70px] p-[10px] text-[22px] text-white font-bold border-[2.5px] border-[#fffefe] rounded-[35px] w-[calc(100%-22px)] bg-transparent max-sm:w-full md:w-auto'
              onChange={handleChange}
              required
            />
          </div>
          <div className='text-white text-xs mb-2.5 max-sm:text-[14px]'>
            <p>By clicking on Continue you automatically agree to the terms and conditions</p>
          </div>
          <button className='w-full p-[15px] text-white bg-[#372622] text-[18px] font-medium cursor-pointer rounded-[25px] transition-colors duration-300 ease-in-out border-[2px] border-[#372622] hover:bg-transparent hover:border-[white] max-sm:p-[10px]'>Sign Up</button>
        </form>
        <p className="mt-[20px] text-[18px] text-white max-sm:text-[14px]">Already have an account? <span className='text-white font-semibold'><Link to = "/login" className='text-white font-semibold no-underline inline-block transition-transform transform hover:scale-110'>Login</Link></span></p>
      </div>
    </div>
  );
}

export default SignUp