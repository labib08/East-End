import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Footer from './Components/Footer/Footer';
import { Navbar } from './Components/Navbar/Navbar';
import Admin from './Pages/Admin/Admin';
import Home from './Pages/Home/Home';
import HomeCategory from './Pages/HomeCategory/HomeCategory';
import Login from './Pages/Login/Login';
import MyOrders from './Pages/MyOrders/MyOrders';
import Order from './Pages/Order/Order';
import SignUp from './Pages/SignUp/SignUp';
import Verify from './Pages/Verify/Verify';

function App() {
  return (
    <>
      <div className="App">
      <ToastContainer/>
        <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/coffee" element = {<HomeCategory category = "coffee"/>} />
          <Route path = "/dessert" element = {<HomeCategory category = "dessert"/>} />
          <Route path = "/merch" element = {<HomeCategory category = "merch"/>} />
          <Route path = "/order" element = {<Order/>}/>
          <Route path = "/cart" element = {<HomeCategory category = "cart"/>} />
          <Route path = "/login" element = {<Login/>}/>
          <Route path = "/signup" element = {<SignUp/>}/>
          <Route path = "/admin" element = {<Admin/>}/>
          <Route path = "/verify" element = {<Verify/>}/>
          <Route path = "/myorders" element = {<MyOrders/>}/>
        </Routes>
        </BrowserRouter>
      </div>
      <Footer/>
    </>

  );
}

export default App;
