import facebook from '../../Assets/facebook.svg';
import insta from '../../Assets/insta.svg';
import link_icon from '../../Assets/link_icon.svg';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <div className='footer bg-[#372622] mt-[40px]'>
        <div className='flex justify-between items-center h-[12vh]'>
            <div>
                <p className="footer-p text-white ml-[110px]">Copyright 2012 - 2024 | All Rights Reserved | Powered by |</p>
            </div>
            <span className="flex items-center">
                <div className="social-icon inline-block mr-[110px]">
                    <a className='social-icon-img w-[72px] h-[72px] mr-[-20px] bg-none inline-flex items-center justify-center leading-[1] relative' href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                        <img className="w-[40%] z-[2] transition-all duration-300 ease-in-out" src={link_icon} alt="" />
                    </a>
                    <a className='social-icon-img w-[72px] h-[72px] mr-[-20px] bg-none inline-flex items-center justify-center leading-[1] relative' href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                        <img className="w-[40%] z-[2] transition-all duration-300 ease-in-out" src={facebook} alt="" />
                    </a>
                    <a className='social-icon-img w-[72px] h-[72px] mr-[-20px] bg-none inline-flex items-center justify-center leading-[1] relative' href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                        <img className="w-[40%] z-[2] transition-all duration-300 ease-in-out" src={insta} alt="" />
                    </a>
                </div>
            </span>
        </div>
    </div>

  );
}

export default Footer;
