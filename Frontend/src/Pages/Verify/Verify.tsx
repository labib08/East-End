import axios from "axios";
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Verify: React.FC = () => {
    const url = "http://localhost:5000";
    const [search] = useSearchParams();
    const success = search.get("success");
    const orderId = search.get("orderId");
    const navigate = useNavigate();

    const verifyPayment = React.useCallback(async () => {
        const response = await axios.post(`${url}/api/order/verify`, { success, orderId });
        if (response.data.success) {
            navigate("/myorders");
        } else {
            navigate("/");
        }
    }, [url, success, orderId, navigate]);

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
