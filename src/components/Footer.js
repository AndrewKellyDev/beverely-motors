import { FaDiscord, FaTwitter } from "react-icons/fa";
import { NavLink } from "react-router-dom";


export const Footer = () => {
  return (
    <div className="bg-third grid md:grid-cols-3 grid-cols-1 lg:px-10% px-5% py-20 text-fifth">
      <div className="px-2">
        <div className="text-3xl font-bold">
          <span className="text-primary">Beverley </span>
          Commercials
        </div>
        <div className="my-4">
         Beverley Commercials is a quality used van dealership located in East Yorkshire. We source exceptional quality used vehicles for our customers right across the UK and the Northern Ireland.
        </div>
        <div className="mt-4">Copyright 2022 Beverley Commercials. All rights reserved.</div>
      </div>

      <div className="grid grid-cols-2 md:mt-0 mt-4 px-2">
        <div className="flex flex-col">
          <div className="text-primary mb-4 font-bold text-lg">Company</div>
          <a href="/#about">About us</a>
          <NavLink to="/stock" className="mt-1">Available Vehicles</NavLink>
        </div>
        <div>
        <div className="text-primary mb-4 font-bold text-lg">Help</div>
          <div>Help center</div>
          <div className="mt-1">Contacts</div>
        </div>
      </div>

      <div className="md:mt-0 mt-4 px-2">
      <div className="text-primary mb-4 font-bold text-lg">Sign up for our newsletter!</div>
        <div>
          Stay upto date with all the latest stock that comes through our door.
        </div>
        <div className="mt-4 w-full flex">
          <input className="flex-1 outline-none px-4 py-2 rounded-l-lg" placeholder="E-mail address" />
          <button className="bg-primary text-white px-4">Sign up</button>
        </div>
      </div>
    </div>
  );
};
