import axios from 'axios';
import { useEffect, useState } from 'react';
//import { itemData } from '../../Data/Items';
import Cart from '../Cart/Cart';
import Coffee from '../Coffee/Coffee';
import Dessert from '../Dessert/Dessert';
interface Props {
    category: string
}
interface Items {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  type: string;
}

const HomeCategory: React.FC<Props> = ({category}: Props) => {
  const url = "http://localhost:5000";
  const [itemData, setItemData] = useState<Items[]>([]);
  const [cartItems, setCartItems] = useState<Record<string, number>>(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : {};
  });
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  const addToCart = (itemID: string): void => {
    setCartItems((prev) => ({
      ...prev,
      [itemID]: (prev[itemID] || 0) + 1,
    }));
  };

  const removeFromCart = (itemID: string): void => {
    setCartItems((prev) => {
      if (prev[itemID] > 1) {
        return { ...prev, [itemID]: prev[itemID] - 1 };
      } else {
        const { [itemID]: _, ...remainingItems } = prev;
        return remainingItems;
      }
    });
  };

  const getTotal = (): number => {
    return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
      const item = itemData.find((item) => item.id === itemId);
      return item ? total + item.price * quantity : total;
    }, 0);
  };



  const getItemList = async() => {
    const response = await axios.get(`${url}/api/item/list`);
    setItemData(response.data.data);

  }
  useEffect(() => {
    async function loadItemData() {
      await getItemList();
    }
    loadItemData();
  }, [])
  const coffeeData = itemData.filter(item => item.type === "Coffee");
  const dessertData = itemData.filter(item => item.type === "Dessert");

  return (
    <div>
      {category === 'coffee' && (
        <>
        <Coffee coffeeData={coffeeData} addToCart = {addToCart} removeFromCart = {removeFromCart} cartItems = {cartItems} setCartItems = {setCartItems}/>
        </>
      )}
      {category === 'dessert' && (
        <>
        <Dessert dessertData={dessertData} addToCart = {addToCart} removeFromCart = {removeFromCart} cartItems = {cartItems} setCartItems = {setCartItems}/>
        </>
      )}
      {category === "cart" && (
        <>
        <Cart itemData = {itemData} addToCart = {addToCart} removeFromCart = {removeFromCart} cartItems = {cartItems} setCartItems = {setCartItems} getTotal = {getTotal}/>
        </>
      )}
    </div>
  )
}

export default HomeCategory