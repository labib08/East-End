import { useEffect, useState } from 'react';
import { itemData } from '../../Data/Items';
import Coffee from '../Coffee/Coffee';
import Dessert from '../Dessert/Dessert';
interface Props {
    category: string
}
interface CartItems {
  [key: string]: number;
};

const HomeCategory = ({category}: Props) => {
  const [cartItems, setCartItems] = useState<CartItems>({});

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
  useEffect(() => {
    console.log(cartItems);
  }, [cartItems])

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
    </div>
  )
}

export default HomeCategory