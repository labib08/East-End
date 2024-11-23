import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const MenuData: React.FC = () => {
  const url = "http://localhost:5000";
  const [menuList, setMenuList] = useState([]);
  const getMenuItem = async () => {
    const response = await axios.get(`${url}/api/item/list`);
    if (response.data.success) {
      setMenuList(response.data.data);
    }
    else {
      toast.error("Error");
    }
  }
  return (
    <div>MenuData</div>
  )
}

export default MenuData