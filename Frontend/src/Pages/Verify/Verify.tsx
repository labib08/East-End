import axios from "axios";
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Verify: React.FC = () => {
    const url = "https://east-end-backend.onrender.com";
    const token = localStorage.getItem('token');
    const [search] = useSearchParams();
    const success = search.get("success");
    const navigate = useNavigate();

    const verifyPayment = React.useCallback(async () => {
        const response = await axios.post(`${url}/api/order/verify`, {success}, {headers:{token}});
        if (response.data.success) {
            navigate("/myorders");
            localStorage.removeItem("cartItems");
        } else {
            navigate("/");
        }
    }, [url, success, token, navigate]);

    useEffect(() => {
        verifyPayment();
    }, [verifyPayment]);

    return (
        <div className="min-h-[60vh] grid">
            <div className="w-[100px] h-[100px] place-self-center border-[5px] border-solid border-gray-400 border-t-[rgb(92,22,22)] rounded-full rotate-verify"></div>
        </div>
    );
};

export default Verify;
