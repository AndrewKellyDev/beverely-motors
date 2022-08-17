import { useRef, useState } from "react";
import {GiHamburgerMenu} from "react-icons/gi"
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const [hamburgerStatus, setHamburgerStatus] = useState(false);
  const navigationRef = useRef(null)
  return (
    <div className="absolute w-full flex justify-between items-center lg:px-10% px-5% py-10">
      <div className="text-2xl font-bold font-Inter text-blackLight"><span className="text-primary">Beverley </span>Commercials</div>
      <div onClick={()=>{
        if(hamburgerStatus) {
          navigationRef.current.style.right = "-100%"
          setHamburgerStatus(false)
        }
      }} ref={navigationRef} className={`items-center uppercase cmd:fixed flex cmd:flex-col cmd:bg-white cmd:text-black cmd:h-full cmd:w-full cmd:z-10 cmd:top-0 cmd:justify-center cmd:items-center cmd:px-10 cmd:gap-5 cmd:transition-all cmd:duration-500 ${hamburgerStatus? "cmd:right-0 text-white":"cmd:-right-full"}`}>
        <NavLink to="/" className="xl:mr-6 lg:mr-4 mr-2 hover:text-primary cursor-pointer font-Inter text-gray-400 tracking-tighter">Home</NavLink>
        <NavLink to="/stock" className="xl:mr-6 lg:mr-4 mr-2 cursor-pointer hover:text-primary font-Inter text-gray-400 tracking-tighter">All Vehicles</NavLink>
        <a href="/#about" className="xl:mr-6 lg:mr-4 mr-2 cursor-pointer hover:text-primary font-Inter text-gray-400 tracking-tighter">About US</a>
        <a href="/#location" className="xl:mr-6 lg:mr-4 mr-2 cursor-pointer hover:text-primary md:border-r border-r-none border-gray-400 lg:pr-10 pr-4 font-Inter text-gray-400 tracking-tighter">Our Location</a>
        <button className="bg-primary hover:bg-hover px-6 py-2 text-white rounded lg:ml-8 lg-4 font-Inter">
          Contact Us
        </button>
      </div>
     <button className="md:hidden block z-20 text-lg" onClick={()=>{
       if(!hamburgerStatus){
        navigationRef.current.style.right = "0"
       }
       else {
        navigationRef.current.style.right = "-100%"
       }
       setHamburgerStatus(!hamburgerStatus)
     }}>
       <GiHamburgerMenu />
     </button>
    </div>
  );
};
