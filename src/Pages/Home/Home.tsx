import WelcomePage from "../../Components/WelcomePage/WelcomePage"
import { locationData } from "../../Data/Location"

const Home: React.FC = () => {
  return (
    <div>
      <WelcomePage/>
      <div className="flex items-center justify-center transition-[all_0.4s] fade-in-home">
      <h2 className="text-[80px] font-normal mt-[20px] text-[#5c1616]">Cafes</h2>
      </div>
      <div className="grid grid-cols-2 gap-[20px] mt-[20px] mx-[100px] transition-[all_0.4s] fade-in-home">
        {locationData.map((location, index) => (
          <div key={index} className="border border-[#ccc] p-[20px] rounded-[10px] bg-[#f9f9f9]">
            <h3 className="text-[38px] font-[450] mb-[20px] uppercase border-b border-black">{location.branch_name}</h3>
            <p className="m-[5px_0] text-[22px] font-[300] mb-[20px]">{location.location}</p>
            <p className="m-[5px_0] text-[22px] font-[300] mb-[20px]">Open Hours: <br/>{location.open_hours}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home