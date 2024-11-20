import React, { useState } from "react";
import AddItems from "../AddItems/AddItems";
import MenuData from "../MenuData/MenuData";
import OrderList from "../OrderList/OrderList";

const Admin: React.FC = () => {

  const tabList = ["Add Items", "Menu", "Orders"]
  const [activeTab, setActiveTab] = useState<string>("Add Items");

  const renderContent = () => {
    if (activeTab === "Add Items") {
      return <AddItems/>
    }
    else if (activeTab === "Menu") {
      return <MenuData/>
    }
    else if (activeTab === "Orders") {
      return <OrderList/>
    }
    else {
      return null;
    }
  };

  return (
    <div className="font-sans max-w-5xl mx-auto my-5 p-5 border border-gray-300 rounded-lg bg-gray-50 shadow-md fade-in-cart">
      <h1 className="text-2xl text-center mb-5 text-gray-800">Admin Panel</h1>
      <div className="flex justify-around border-b-2 border-gray-300 mb-5">
      {tabList.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex-1 py-2 text-base bg-transparent outline-none cursor-pointer text-center transition-colors duration-300 ease-in-out ${
            activeTab === tab
              ? "text-blue-500 border-b-2 border-blue-500 font-bold"
              : "text-gray-500 hover:text-blue-500"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>


      <div className="p-5 text-base bg-white border border-gray-300 rounded-md shadow-sm text-gray-800">
        {renderContent()}
      </div>

    </div>
  );
};

export default Admin;
