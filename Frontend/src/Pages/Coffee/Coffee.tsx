import MenuItem from "../../Components/MenuItem/MenuItem";
import './Coffee.css';
interface Coffee {
    id: string;
    name: string;
    image: string;
    price: number;
    description: string;
}
interface CartItems {
    [key: string]: number;
  };
interface Props {
    coffeeData: Coffee[];
    addToCart: (itemID: string) => void;
    removeFromCart: (itemID: string) => void;
    cartItems: CartItems;
    setCartItems: React.Dispatch<React.SetStateAction<CartItems>>;
}
const Coffee: React.FC<Props> = ({coffeeData, addToCart, removeFromCart, cartItems, setCartItems}: Props) => {
  return (
    <div className="coffee-display">
        <div className="flex items-center justify-center bg-custom-red min-h-[7vw]">
        <h2 className="text-white font-[300] text-[48px]"> Our Coffees </h2>
        </div>
        <div className="menuItemCoffee grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] mt-[30px] mx-[30px] gap-[30px] row-gap-[50px]">
            {coffeeData.map((coffee, index) => {
                return <MenuItem key={index} id={coffee.id} name = {coffee.name} image={coffee.image} price = {coffee.price} description= {coffee.description} addToCart = {addToCart} removeFromCart = {removeFromCart} cartItems = {cartItems} setCartItems = {setCartItems}/>

            })}
        </div>
    </div>
  )
}

export default Coffee