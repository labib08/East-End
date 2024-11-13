import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import Cart from './Pages/Cart/Cart';
import Home from './Pages/Home/Home';
import HomeCategory from './Pages/HomeCategory/HomeCategory';
import LoginSignUp from './Pages/LoginSignUp/LoginSignUp';
import Product from './Pages/Product/Product';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/coffee" element = {<HomeCategory category = "coffee"/>} />
        <Route path = "/dessert" element = {<HomeCategory category = "dessert"/>} />
        <Route path = "/merch" element = {<HomeCategory category = "merch"/>} />
        <Route path = "/product" element = {<Product/>}>
          <Route path = ":productID" element = {<Product/>}/>
        </Route>
        <Route path = "/cart" element = {<Cart/>}/>
        <Route path = "/login" element = {<LoginSignUp/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
