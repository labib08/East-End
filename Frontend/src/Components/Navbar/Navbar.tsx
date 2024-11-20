import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import cart from '../../Assets/cart-icon.svg';
import logo from '../../Assets/logo.png';
import toggle from '../../Assets/navbar-toggle.png';
import './Navbar.css';
export const Navbar: React.FC = () => {
  const [page, setPage] = useState<string>('home');
  const onClickPage = (currPage: string): void => {
    return setPage(currPage);
  }
  const setHrTag = (currPage: string): JSX.Element | null => {
    console.log(page, currPage)
    if (page === currPage) {
        return <hr className="border-0 w-[80%] mt-[8px] ml-[7px] h-[3px] rounded-xl bg-custom-red" />;
    }
    return null;
  }
  const menuRef = useRef<HTMLUListElement | null>(null);
  const navbar_toggle = (e: React.MouseEvent<HTMLImageElement>): void => {
    const menuElement = menuRef.current;

    if (menuElement) {
        menuElement.classList.toggle('nav-menu-visible');
    }
    e.currentTarget.classList.toggle('open');
};
  return (

    <div className="navbar flex justify-around shadow-md py-[10px]">
      <div className="nav-logo flex items-center gap-2.5">
        <Link to = "/">
          <img src={logo} alt="" className="nav-logo-img w-[70px] h-[70px]" />
        </Link>
        <Link to = "/"><p className="nav-logo-p text-custom-red text-[40px] font-extrabold">East End</p></Link>
        <Link to = "/"><p className="nav-logo-p-1 text-custom-red flex items-center justify-center mt-[-20px] ml-[-10px]">TM</p></Link>
      </div>
      <img className='nav-dropdown' onClick={navbar_toggle} src={toggle} alt = ''/>
      <ul ref = {menuRef} className="nav-menu flex items-center list-none gap-50 text-black text-[20px] font-medium">
        <li onClick={() => onClickPage('home')}>
          <Link to="/" className="nav-menu-li no-underline text-black flex flex-col items-center justify-center gap-3 cursor-pointer navbar-link-tag hover:text-[rgb(83,14,14)] focus:text-[rgb(63,13,13)] transition-colors duration-400 ease-in-out">
            Home
          </Link>
          {setHrTag("home")}
        </li>
        <li onClick={() => onClickPage('coffee')}>
          <Link to="/coffee" className="nav-menu-li no-underline text-black flex flex-col items-center justify-center gap-3 cursor-pointer navbar-link-tag hover:text-[rgb(83,14,14)] focus:text-[rgb(63,13,13)] transition-colors duration-400 ease-in-out">
            Coffee
          </Link>
          {setHrTag("coffee")}
        </li>
        <li onClick={() => onClickPage('dessert')}>
          <Link to="/dessert" className="nav-menu-li no-underline text-black flex flex-col items-center justify-center gap-3 cursor-pointer navbar-link-tag hover:text-[rgb(83,14,14)] focus:text-[rgb(63,13,13)] transition-colors duration-400 ease-in-out">
            Dessert
          </Link>
          {setHrTag("dessert")}
        </li>
        <li onClick={() => onClickPage('merch')}>
          <Link to="/merch" className="nav-menu-li no-underline text-black flex flex-col items-center justify-center gap-3 cursor-pointer navbar-link-tag hover:text-[rgb(83,14,14)] focus:text-[rgb(63,13,13)] transition-colors duration-400 ease-in-out">
            Merch
          </Link>
          {setHrTag("merch")}
        </li>
        <li onClick={() => onClickPage('admin')}>
          <Link to="/admin" className="nav-menu-li no-underline text-black flex flex-col items-center justify-center gap-3 cursor-pointer navbar-link-tag hover:text-[rgb(83,14,14)] focus:text-[rgb(63,13,13)] transition-colors duration-400 ease-in-out">
            Admin
          </Link>
          {setHrTag("admin")}
        </li>
      </ul>
      <div className="nav-login-cart flex items-center gap-40">
        <Link to='/login'>
          <button className="nav-login-cart-button w-36 h-12 outline-none border border-[#a3a3a3] rounded-full text-black text-lg font-medium bg-white cursor-pointer hover:shadow-[2px_2px_5px_0px_rgba(0,0,0,0.5)] active:bg-[rgb(164,162,162)]">
            Login
          </button>
        </Link>

        <Link to='/cart'>
          <img onClick = {() => onClickPage('cart')} src={cart} alt="" className="nav-login-cart-img w-10 h-auto cursor-pointer" />
        </Link>
        <div  onClick = {() => onClickPage('cart')} className="nav-cart-count w-5 h-5 flex justify-center items-center mt-[-43px] ml-[-45px] rounded-full text-[14px] bg-custom-red text-white cursor-pointer">
          0
        </div>
      </div>
    </div>

      )
  }
