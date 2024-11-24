import axios from "axios";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bgImg from '../../Assets/signup-background-5.jpg';

interface FormData {
    email: string;
    password: string;
  }
const Login: React.FC = () => {
    const url = "http://localhost:5000";
    //const [token, setToken] = useState<string>("")
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
        })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await axios.post(`${url}/api/user/login`, formData);
        if (response.data.success) {
            localStorage.clear();
            localStorage.setItem("token", response.data.token);
            navigate('/');
        }
        else {
            alert(response.data.message);
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
        <h1 className='text-[68px] text-white font-medium mb-[30px] max-sm:text-[32px] max-sm:font-[500]'>Login</h1>
        <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5 mb-5 bg-none">
                <input
                type="text"
                placeholder="Email"
                name="email"
                value={formData.email}
                className='h-[70px] p-[10px] text-[22px] text-white font-bold border-[2.5px] border-[#fffefe] rounded-[35px] w-[calc(100%-22px)] bg-transparent max-sm:w-full md:w-auto'
                onChange={handleChange}
                required
                />
                <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                className='h-[70px] p-[10px] text-[22px] text-white font-bold border-[2.5px] border-[#fffefe] rounded-[35px] w-[calc(100%-22px)] bg-transparent max-sm:w-full md:w-auto'
                onChange={handleChange}
                required
                />
        </div>
        <button className='w-full p-[15px] text-white bg-[#372622] text-[18px] font-medium cursor-pointer rounded-[25px] transition-colors duration-300 ease-in-out border-[2px] border-[#372622] hover:bg-transparent hover:border-[white] max-sm:p-[10px]'>Login</button>
        </form>
        <p className="mt-[20px] text-[18px] text-white max-sm:text-[14px]">Don't have an account? <span className='text-white font-semibold'><Link to = "/signup" className='text-white font-semibold no-underline inline-block transition-transform transform hover:scale-110'>Sign Up</Link></span></p>
        </div>
        </div>
    )
}

export default Login