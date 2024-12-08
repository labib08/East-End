import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Footer from './Components/Footer/Footer';
import Layout from './Components/Layout/Layout';
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
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path = "/coffee" element = {<Layout><HomeCategory category = "coffee"/></Layout>} />
          <Route path = "/dessert" element = {<Layout><HomeCategory category = "dessert"/></Layout>} />
          <Route path = "/merch" element = {<Layout><HomeCategory category = "merch"/></Layout>} />
          <Route path = "/order" element = {<Layout><Order/></Layout>}/>
          <Route path = "/cart" element = {<Layout><HomeCategory category = "cart"/></Layout>} />
          <Route path = "/login" element = {<Layout><Login/></Layout>}/>
          <Route path = "/signup" element = {<Layout><SignUp/></Layout>}/>
          <Route path = "/admin" element = {<Layout><Admin/></Layout>}/>
          <Route path = "/verify" element = {<Layout><Verify/></Layout>}/>
          <Route path = "/myorders" element = {<Layout><MyOrders/></Layout>}/>
        </Routes>
        </BrowserRouter>
      </div>
      <Footer/>
    </>

  );
}

export default App;
