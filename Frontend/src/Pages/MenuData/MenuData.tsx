import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import cross from "../../Assets/cross-icon.svg";

interface MenuItem {
  _id: string,
  name: string;
  price: number;
  type: string;
  image: string;
}


const MenuData: React.FC = () => {
  const url = "https://east-end-backend.onrender.com";
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const getMenuItem = async () => {
    const response = await axios.get(`${url}/api/item/list`);
    if (response.data.success) {
      setMenuList(response.data.data);
    }
    else {
      toast.error("Error");
    }
  }
  useEffect(()=> {
    getMenuItem();
  }, [])
  const removeItem = async(itemID: string) => {
    const response = await axios.post(`${url}/api/item/remove`, {id:itemID})
    await getMenuItem();
    if (response.data.success) {
      toast.success(response.data.message);
    }
    else {
      toast.error("Error")
    }
  }

  return (
    <div className='cart-items border border-gray-300 rounded-lg p-5 bg-gray-100'>
      <div className='cart-items-title grid grid-cols-[0.5fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center gap-2.5 text-gray-600 text-[max(1vw,12px)] font-bold border-b border-gray-300 pb-5'>
        <p>Items</p>
        <p>Name</p>
        <p>Price</p>
        <p>Type</p>
        <p>Remove</p>
      </div>
      <br />
      {menuList.map((item, index) => (
        <div key={index}>
          <div className="cart-items-item grid grid-cols-[0.5fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center gap-2.5 text-gray-800">
            <img className="w-12 h-12 rounded object-cover" src={`${url}/images/` + item.image} alt="" />
            <p>{item.name}</p>
            <p>${item.price}</p>
            <p>{item.type}</p>
            <img onClick={()=>removeItem(item._id)} src={cross} className="h-[16px] w-[16px] cursor-pointer transition-transform duration-300 ease-in-out hover:scale-150" alt="Remove" />
          </div>
          <hr className='h-px bg-gray-300 border-0 my-5'/>
        </div>
      ))}
    </div>

  )
}

export default MenuData