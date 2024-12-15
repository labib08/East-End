import { useEffect, useState } from 'react';
import intro_photo_2 from '../../Assets/intro_photo_2.webp';
import intro_photo_3 from '../../Assets/intro_photo_3.avif';
import intro_photo_4 from '../../Assets/intro_photo_4.webp';
const WelcomePage : React.FC = () => {
  const images = [intro_photo_2, intro_photo_3, intro_photo_4];
  const [currImage, setCurrImage] = useState<number>(0);
  const [fade, setFade] = useState<boolean>(true);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrImage((prevImage) => (prevImage + 1) % images.length);
        setFade(true);
      }, 2000);
    }, 6000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  const backgroundStyle: React.CSSProperties = {
    backgroundImage: `url(${images[currImage]})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    borderRadius: '35px',
    height: '34vw',
    margin: '30px auto',
    marginLeft: '50px',
    marginRight: '50px',
    position: 'relative',
    opacity: fade ? 1 : 0,
    transition: 'opacity 3s ease-in-out',
  };
  return (
    <div style={backgroundStyle}>
      <div className="absolute flex flex-col items-start gap-[1.5vw] max-w-[50%] bottom-[10%] left-[6vw]">
        <h2 className='font-medium text-white text-[max(4.5vw,22px)] transition-[all_0.4s] fade-in sm:text-custom-welcome-font'>Order your favorite coffee here</h2>
        <p className='text-white text-[1vw] transition-[all_0.4s] fade-in min-mid:font-[600] sm:font-[600]'>Choose from a diverse range of coffees and desserts featuring the World's finest coffee beans</p>
        <button className='border-none text-black p-[1vw_2.3vw] bg-white text-[max(1vw,13px)] rounded-full transition-[all_0.4s] fade-in min-md:transform min-md:scale-[0.8] min-md:-ml-[15px] '>View Coffee</button>
      </div>
    </div>
  )
}

export default WelcomePage