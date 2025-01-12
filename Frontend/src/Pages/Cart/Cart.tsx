import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import cross from "../../Assets/cross-icon.svg";
interface Items {
  _id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  type: string;
}
type OrderItem = Items & { quantity: number };
interface CartItems {
  [key: string]: number;
};
interface Props {
  itemData: Items[];
  addToCart: (itemID: string) => void;
  removeFromCart: (itemID: string) => void;
  cartItems: CartItems;
  setCartItems: React.Dispatch<React.SetStateAction<CartItems>>;
  getTotal: () => number;
}
const Cart: React.FC<Props> = ({itemData, addToCart, removeFromCart, cartItems, setCartItems, getTotal}: Props) => {
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const url = "http://localhost:5000";
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  useEffect(() => {
    const hasItems = Object.values(cartItems).some((count) => count > 0);
    setIsEmpty(!hasItems);
  }, [cartItems]);

  const onClickSubmit = async() => {
    await axios.post(`${url}/api/order/delete`, {}, {headers: {token}})
    let orderItems: OrderItem[] = itemData
    .filter((item) => cartItems[item._id] > 0)
    .map((item) => ({
      ...item,
      quantity: cartItems[item._id],
    }));
    let orderData = {
      items: orderItems,
      amount: getTotal() + 2,
    }

    console.log("Order Data:", orderData);
    const response = await axios.post(`${url}/api/order/details`, orderData, {headers:{token}})
    console.log(response);
    if (response.data.success) {
      navigate('/order');
    }
    else {
      toast.error(response.data.message);
    }
  }
  return (
    <div className='my-[100px] mx-auto max-w-[1200px] animate-[fadeInHome_0.85s] max-lg:mx-auto max-lg:mt-[100px] max-lg:w-[85%] md-sm:w-[90%] sm:w-[100%]'>
      <div className='border border-[#e2e2e2] rounded-[8px] p-[20px] bg-[#f9f9f9]'>
        <div className='grid grid-cols-[0.5fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center gap-[10px] text-[#666] text-[max(1vw,_12px)] font-bold border-b border-[#c6c5c5] pb-[20px] md-sm:text-[max(1vw,_10px)] sm:text-custom-cart-font'>
          <p className="text-[12px] font-[500]">Items</p>
          <p className="text-[12px] font-[500]">Name</p>
          <p className="text-[12px] font-[500]">Price</p>
          <p className="text-[12px] font-[500]">Quantity</p>
          <p className="text-[12px] font-[500]">Total</p>
          <p className="text-[12px] font-[500]">Remove</p>
        </div>
        <br />
        {itemData
        .filter((item) => cartItems[item._id] > 0)
        .map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-[0.5fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center gap-[10px] text-[#333]">
              <img className="w-[50px] h-[50px] rounded-[4px] md-sm:w-[40px] md-sm:h-[40px] sm:w-[30px] sm:h-[30px]" src={`${url}/images/${item.image}`} alt="" />
              <p className="text-[14px] font-[500] md-sm:text-[12px] sm:text-[10px]">{item.name}</p>
              <p className="text-[14px] font-[500] md-sm:text-[12px] sm:text-[10px]">${item.price.toFixed(1)}</p>
              <p className="text-[14px] font-[500] md-sm:text-[12px] sm:text-[10px]">{cartItems[item._id]}</p>
              <p className="text-[14px] font-[500] md-sm:text-[12px] sm:text-[10px]">${(item.price * cartItems[item._id]).toFixed(1)}</p>
              <img
                onClick={() => {
                  removeFromCart(item._id);
                }}
                src={cross}
                className="h-[10px] w-[10px] cursor-pointer transition-transform duration-300 ease-in-out hover:scale-150"
                alt=""
              />
            </div>
            <hr className="h-[1px] bg-[#c6c5c5] border-0 my-[20px]" />
          </div>
        ))}

      </div>
        <div className="mt-[80px] ml-[30px] mr-[30px] flex justify-between gap-custom-gap-cart-total md-sm:flex md-sm:flex-col-reverse">
          <div className="flex-1 flex flex-col gap-[20px]">
            <h2 className="text-[30px] font-[600]">Cart Totals</h2>
            <div>
              <div className="flex justify-between text-[#555]">
                <p>Subtotal</p>
                <p> ${getTotal().toFixed(1)} </p>
              </div>
              <hr className="h-[1px] bg-[#c6c5c5] border-0 my-[20px]" />
              <div className="flex justify-between text-[#555]">
                <p>Delivery Fee</p>
                <p> ${(getTotal() === 0 ? 0: 2).toFixed(1)} </p>
              </div>
              <hr className="h-[1px] bg-[#c6c5c5] border-0 my-[20px]"/>
              <div className="flex justify-between text-[#555]">
                <b>Total</b>
                <b> ${ (getTotal() === 0 ?0: getTotal() + 2).toFixed(1) } </b>
              </div>
            </div>
            {isEmpty ?
              <button onClick={() => alert('Your cart is empty')} className="border-none text-white bg-[#5c1616] w-[max(15vw,200px)] py-[12px] rounded-full cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[rgb(120,30,30)]">CHECKOUT</button>
            : <button onClick={onClickSubmit} className="border-none text-white bg-[#5c1616] w-[max(15vw,200px)] py-[12px] rounded-full cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[rgb(120,30,30)]">CHECKOUT</button>
            }

          </div>
          <div className="flex-1 md-sm:flex md-sm:justify-start">
            <div>
              <p className="text-gray-[#555]"> If you have a promo code, Enter it here </p>
              <div className="mt-[10px] flex justify-between items-center bg-[#eaeaea] rounded-[50px]">
                <input type = "text" placeholder = "Promo code" className="bg-[#eaeaea] border-none outline-none pl-[10px] rounded-[50px]" />
                <button className="w-custom-gap-promocode py-[12px] px-[5px] bg-black border-none text-white rounded-full">Submit</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Cart;