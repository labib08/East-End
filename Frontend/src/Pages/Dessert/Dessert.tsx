import MenuItem from "../../Components/MenuItem/MenuItem";
interface DessertType {
    _id: string;
    name: string;
    image: string;
    price: number;
    description: string;
}
interface CartItems {
    [key: string]: number;
  };
interface Props {
    dessertData: DessertType[];
    addToCart: (itemID: string) => void;
    removeFromCart: (itemID: string) => void;
    cartItems: CartItems;
    setCartItems: React.Dispatch<React.SetStateAction<CartItems>>;
}
const Dessert: React.FC<Props> = ({dessertData, addToCart, removeFromCart, cartItems, setCartItems}: Props) => {
  return (
    <div className="dessert-display">
        <div className="flex items-center justify-center bg-custom-red min-h-[7vw]">
        <h2 className="text-white font-[300] text-[48px]"> Our Desserts </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] mt-[30px] mx-[30px] gap-[30px] row-gap-[50px] mid-sm:w-[55%] mid-sm:mx-auto mid-sm:mt-[30px]">
            {dessertData.map((dessert, index) => {
                return <MenuItem key={index} id={dessert._id} name = {dessert.name} image={dessert.image} price = {dessert.price} description= {dessert.description} addToCart = {addToCart} removeFromCart = {removeFromCart} cartItems = {cartItems} setCartItems = {setCartItems}/>
            })}
        </div>
    </div>
  )
}

export default Dessert