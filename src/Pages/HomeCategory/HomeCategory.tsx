import { useEffect, useState } from 'react';
import { coffeeData } from '../../Data/Coffee';
import Coffee from '../Coffee/Coffee';
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
        const { [itemID]: _, ...remainingItems } = prev; // Remove item from cart if quantity <= 1
        return remainingItems;
      }
    });
  };
  useEffect(() => {
    console.log(cartItems);
  }, [cartItems])
  return (
    <div>
      {category === 'coffee' && (
        <>
        <Coffee coffeeData={coffeeData} addToCart = {addToCart} removeFromCart = {removeFromCart} cartItems = {cartItems} setCartItems = {setCartItems}/>
        </>
      )}
    </div>
  )
}

export default HomeCategory