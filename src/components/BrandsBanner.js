import React from "react";
import Mazda from "../assets/Brands/mazda.png";
import Audi from "../assets/Brands/audi.png";
import Merc from "../assets/Brands/merc.png";
import Toyota from "../assets/Brands/toyota.png";
import Renulat from "../assets/Brands/renault.png";
import Seat from "../assets/Brands/seat.png";

export const BrandsBanner = () => {
  return (
    <>
      <div className="bg-white pt-5">
        <div className="mt-20 flex flex-col items-center bg-white">
          <p className="text-primary font-bold uppercase ">All Brands</p>
          <p className="text-black text-3xl font-bold mt-2">Browse by Brand</p>

          <div className="flex flex-row mt-5">
            <div className="flex flex-col items-center justify-center">
              <img src={Audi} width={100} height={100}></img>
              <p>Audi (20)</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img src={Mazda} width={100} height={100}></img>
              <p>Mazda (20)</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img src={Merc} width={100} height={100}></img>
              <p>Merc (20)</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img src={Seat} width={100} height={100}></img>
              <p>Seat (20)</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};