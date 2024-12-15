import WelcomePage from "../../Components/WelcomePage/WelcomePage"
import { locationData } from "../../Data/Location"
const Home: React.FC = () => {
  // <div className="home flex items-center justify-center transition-[all_0.4s] fade-in-home">
  //     <h2 className="home-h2 text-[80px] font-normal mt-[20px] text-[#5c1616] min-md:text-[60px] sm:text-[50px]">Cafes</h2>
  //     </div>
  //     <div className="home-branch grid grid-cols-2 gap-[20px] mt-[20px] mx-[100px] transition-[all_0.4s] fade-in-home min-md:grid min-md:grid-cols-1 min-md:p-[15px] sm:mx-auto sm:w-[95%]">
  //       {locationData.map((location, index) => (
  //         <div key={index} className="border border-[#ccc] p-[20px] rounded-[50px] bg-[#f9f9f9] min-md:border min-md:mb-5">
  //           <h3 className="home-h3 text-[38px] font-[450] mb-[20px] uppercase border-b border-black min-md:text-[33px] sm:text-[25px]">{location.branch_name}</h3>
  //           <p className="home-p-1 m-[5px_0] text-[22px] font-[300] mb-[20px] min-md:text-[17px] sm:text-[12px]">{location.location}</p>
  //           <p className="home-p-1 m-[5px_0] text-[22px] font-[300] mb-[20px] min-md:text-[17px] sm:text-[12px]">Open Hours: <br/>{location.open_hours}</p>
  //         </div>
  //       ))}
  //     </div>
  return (
    <div>
      <WelcomePage/>
      <div className="home flex items-center justify-center transition-[all_0.4s] fade-in-home">
      <h2 className="home-h2 text-[80px] font-normal mt-[20px] text-[#5c1616] min-md:text-[60px] sm:text-[50px]">Cafes</h2>
      </div>
      <div className="home-branch grid grid-cols-2 gap-[20px] mt-[20px] mx-[100px] transition-[all_0.4s] fade-in-home min-md:grid min-md:grid-cols-1 min-md:p-[15px] sm:mx-auto">
        {locationData.map((location, index) => (
          <div key={index} className="border border-[#ccc] p-[20px] rounded-[50px] bg-[#f9f9f9] min-md:border min-md:mb-5">
            <h3 className="home-h3 text-[38px] font-[450] mb-[20px] uppercase border-b border-black min-md:text-[33px] sm:text-[25px]">{location.branch_name}</h3>
            <p className="home-p-1 m-[5px_0] text-[22px] font-[300] mb-[20px] min-md:text-[17px] sm:text-[12px]">{location.location}</p>
            <p className="home-p-1 m-[5px_0] text-[22px] font-[300] mb-[20px] min-md:text-[17px] sm:text-[12px]">Open Hours: <br/>{location.open_hours}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home