import addButtonGreen from '../../Assets/add_icon_green.png';
import addButtonWhite from '../../Assets/add_icon_white.png';
import removeButton from '../../Assets/remove_icon_red.png';

interface CartItems {
    [key: string]: number;
  };
interface Props{
    id: string;
    name: string;
    image: string;
    price: number;
    description: string;
    addToCart: (itemID: string) => void;
    removeFromCart: (itemID: string) => void;
    cartItems: CartItems;
    setCartItems: React.Dispatch<React.SetStateAction<CartItems>>;
}
const MenuItem = ({id, name, image, price, description, addToCart, removeFromCart, cartItems, setCartItems}: Props) => {

  return (
    <div className="w-full mx-auto rounded-[15px] shadow-[0px_0px_10px_#00000015] min-h-[480px] flex flex-col transition-[all_0.4s] fade-in">
        <div className="w-full rounded-t-[15px]">
            <img className="w-full rounded-t-[15px]  h-[170px]" src = {image} alt = ""/>
        </div>
        <div className="p-[20px] flex flex-col flex-grow justify-between">
        <div className="mb-[10px]">
            <p className='text-[rgb(92,22,22)] text-[20px] font-medium' >{name}</p>
            </div>
            <p className="text-[#676767] text-[12px] mb-auto">{description}</p>
            <div className="flex justify-between items-center mt-auto">
                <p className="text-[rgb(92,22,22)] text-[22px] font-medium">${price.toFixed(1)}</p>
                {cartItems[id] > 0 ? (
                    <div className="flex items-center gap-2.5">
                        <img className = "cursor-pointer w-[30px] transform hover:scale-125 transition-transform duration-300" onClick={() => removeFromCart(id)} src={removeButton} alt="" />
                        <p>{cartItems[id]}</p>
                        <img className = "cursor-pointer w-[30px] transform hover:scale-125 transition-transform duration-300" onClick={() => addToCart(id)} src={addButtonGreen} alt="" />
                    </div>
                ) : (
                    <img className="cursor-pointer w-[30px] transform hover:scale-125 transition-transform duration-300" onClick={() => addToCart(id)} src={addButtonWhite} alt="" />
                )}
            </div>
        </div>
    </div>
  )
}

export default MenuItem