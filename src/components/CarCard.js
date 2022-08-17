import React from "react";
import { BiCog, BiGasPump } from "react-icons/bi";
import { TbRoad } from "react-icons/tb";
import { BsArrowRight } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import Corsa from "../assets/images/Corsa.jpeg";
import PetrolIcon from "../assets/images/PETROL.png";
import GearIcon from "../assets/images/GEAR.png";
import MileIcon from "../assets/images/MILES.png";

export const CarCard = (props) => {
  const {
    _id,
    make,
    model,
    carImg,
    body,
    fuel,
    milage,
    transmition,
    price,
    sold,
  } = props.car;

  var divStyle = {
    backgroundImage: "url(" + process.env.REACT_APP_SUPABASE_BUCKEDT_URL+carImg[0] || Corsa + ")",
  };

  return (
    <div className="bg-white rounded shadow-md">
      <div
        className="sm:h-64 sm:w-76 h-60 w-72 bg-center bg-cover relative overflow-hidden"
        style={divStyle}
      >
        {sold === "true" && (
          <div className="absolute bg-black text-white text-5xl text-center py-3 transform -rotate-45 bottom-10 -left-10 -right-60 font-extrabold">
            SOLD
          </div>
        )}
      </div>
      <div className="sm:px-5 px-1 py-3 z-10">
        <div className="text-center">
          <p className="font-bold uppercase mb-1 font-Inter tracking-tighter">{`${make} ${model}`}</p>
        </div>

        <div className="border-b border-hr"></div>

        <div className="flex flex-row items-center justify-between px-4 py-3 text-secondary text-md font-bold">
          <div className="flex flex-col items-center justify-center space-x-1">
            <img src={PetrolIcon} alt="petrol" />
            <p className="capitalize">{fuel}</p>
            <p className="text-gray-300 font-Inter text-sm font-thin">Fuel</p>
          </div>

          <div className="flex flex-col items-center justify-center space-x-1">
            <img src={MileIcon} alt="mile" />
            <p className="capitalize">{milage.toLocaleString()}</p>
            <p className="text-gray-300 font-Inter text-sm font-thin">Miles</p>
          </div>

          <div className="flex flex-col items-center justify-center space-x-1">
            <img src={GearIcon} alt="gear" />
            <p className="capitalize">{transmition}</p>
            <p className="text-gray-300 font-Inter text-sm font-thin">Gearbox</p>
          </div>
        </div>
      </div>
      <NavLink
        to={`/detail/${_id}`}
        className="flex justify-between items-center border px-5 py-3 w-auto rounded cursor-pointer bg-primary text-white text-xl hover:bg-secondary"
      >
        <p className="tracking-tighter">£{price.toLocaleString()}</p>
        <BsArrowRight />
      </NavLink>
    </div>
  );
};
