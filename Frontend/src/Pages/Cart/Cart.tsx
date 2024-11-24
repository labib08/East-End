import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cross from "../../Assets/cross-icon.svg";
import './Cart.css';
interface Items {
  _id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  type: string;
}

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
  useEffect(() => {
    const hasItems = Object.values(cartItems).some((count) => count > 0);
    setIsEmpty(!hasItems);
  }, [cartItems]);
  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className='cart-items-title'>
          <p>Items</p>
          <p>Name</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        {itemData
        .filter((item) => cartItems[item._id] > 0)
        .map((item, index) => (
          <div key={index}>
            <div className="cart-items-item">
              <img className="item-image" src={`${url}/images/${item.image}`} alt="" />
              <p>{item.name}</p>
              <p>${item.price.toFixed(1)}</p>
              <p>{cartItems[item._id]}</p>
              <p>${(item.price * cartItems[item._id]).toFixed(1)}</p>
              <img
                onClick={() => {
                  removeFromCart(item._id);
                }}
                src={cross}
                className="cross"
                alt=""
              />
            </div>
            <hr />
          </div>
        ))}

      </div>
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p> ${getTotal().toFixed(1)} </p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p> ${(getTotal() === 0 ? 0: 2).toFixed(1)} </p>
              </div>
              <hr/>
              <div className="cart-total-details">
                <b>Total</b>
                <b> ${ (getTotal() === 0 ?0: getTotal() + 2).toFixed(1) } </b>
              </div>
            </div>
            {isEmpty ?
              <button onClick={() => alert('Your cart is empty')}>CHECKOUT</button>
            : <Link to = "/order"><button>CHECKOUT</button></Link>
            }

          </div>
          <div className="cart-promocode">
            <div>
              <p> If you have a promo code, Enter it here </p>
              <div className="cart-promocode-input">
                <input type = "text" placeholder = "Promo code" />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Cart;