import { useState } from 'react';
import { Link } from 'react-router-dom';
import cart from '../../Assets/cart-icon.svg';
import logo from '../../Assets/logo.png';
export const Navbar: React.FC = () => {
  const [page, setPage] = useState<string>('home');
  const onClickPage = (currPage: string) => {
    return setPage(currPage);
  }
  const setHrTag = (currPage: string) => {
    console.log(page, currPage)
    if (page === currPage) {
        return <hr className="border-0 w-[80%] mt-[8px] ml-[7px] h-[3px] rounded-xl bg-custom-red" />;
    }
    return null;
  }

  return (

    <div className="flex justify-around shadow-md py-[10px]">
      <div className="flex items-center gap-2.5">
        <img src={logo} alt="" className="w-[70px] h-[70px]" />
        <p className="text-custom-red text-[40px] font-extrabold">East End</p>
        <p className="text-custom-red flex items-center justify-center mt-[-20px] ml-[-10px]">TM</p>
      </div>
      <ul className="flex items-center list-none gap-50 text-black text-[20px] font-medium">
        <li onClick={() => onClickPage('home')}>
          <Link to="/" className="no-underline text-black flex flex-col items-center justify-center gap-3 cursor-pointer navbar-link-tag hover:text-[rgb(83,14,14)] focus:text-[rgb(63,13,13)] transition-colors duration-400 ease-in-out">
            Home
          </Link>
          {setHrTag("home")}
        </li>
        <li onClick={() => onClickPage('coffee')}>
          <Link to="/coffee" className="no-underline text-black flex flex-col items-center justify-center gap-3 cursor-pointer navbar-link-tag hover:text-[rgb(83,14,14)] focus:text-[rgb(63,13,13)] transition-colors duration-400 ease-in-out">
            Coffee
          </Link>
          {setHrTag("coffee")}
        </li>
        <li onClick={() => onClickPage('dessert')}>
          <Link to="/dessert" className="no-underline text-black flex flex-col items-center justify-center gap-3 cursor-pointer navbar-link-tag hover:text-[rgb(83,14,14)] focus:text-[rgb(63,13,13)] transition-colors duration-400 ease-in-out">
            Dessert
          </Link>
          {setHrTag("dessert")}
        </li>
        <li onClick={() => onClickPage('merch')}>
          <Link to="/merch" className="no-underline text-black flex flex-col items-center justify-center gap-3 cursor-pointer navbar-link-tag hover:text-[rgb(83,14,14)] focus:text-[rgb(63,13,13)] transition-colors duration-400 ease-in-out">
            Merch
          </Link>
          {setHrTag("merch")}
        </li>
      </ul>
      <div className="flex items-center gap-40">
        <Link to='/login'>
          <button className="w-36 h-12 outline-none border border-[#a3a3a3] rounded-full text-black text-lg font-medium bg-white cursor-pointer hover:shadow-[2px_2px_5px_0px_rgba(0,0,0,0.5)] active:bg-[rgb(164,162,162)]">
            Login
          </button>
        </Link>
        <Link to='/cart'>
          <img src={cart} alt="" className="w-10 h-auto" />
        </Link>
        <div className="w-5 h-5 flex justify-center items-center mt-[-43px] ml-[-45px] rounded-full text-[14px] bg-[rgb(92,22,22)] text-white">
          0
        </div>
      </div>
    </div>

      )
  }
