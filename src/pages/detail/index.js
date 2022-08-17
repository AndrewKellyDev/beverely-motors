import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BsTelephoneOutboundFill } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { ResponsiveCarousel, Tabs } from "../../components";
import { api_url } from "../../config/api";

export const DetailPage = () => {
  const { id } = useParams();
  const [carDetail, setCarDetail] = useState()

  useEffect(() => {
    const getCarDetail = async ()=>{
     const _carDetail = await axios.get(`${api_url}/cars/getCarDetail`,{
        params:{
          id:id
        }
      });

      setCarDetail(_carDetail.data)
    }
    getCarDetail()
   
  }, [id]);

  return (
    <>
      <div className="py-40 md:px-56 sm:px-20 px-10">
        <div className="flex flex-row justify-start mb-5">
          <p className="font-bold uppercase text-2xl font-Lato">
            {carDetail? `${carDetail.make}  ${carDetail.model} | ${carDetail.year}` : '-----'}
          </p>
        </div>
        <div className="flex md:flex-row flex-col justify-between">
        {carDetail && <ResponsiveCarousel images={carDetail.carImg} />}
          <div className="Details md:pl-10 pl-0 mx-auto">
            <div className="bg-secondary px-3 py-5 text-white w-72 rounded mb-3">
              <p className="text-white text-center text-xl font-bold">{carDetail? "£"+carDetail.price.toLocaleString():"---"}</p>
            </div>

            <div className="DetailsForCar w-72 h-auto border-2 mb-3">
              <ul className="flex flex-col px-5 uppercase font-NotoSans leading-6 text-sm">
                <li className="border-b-2 py-4 ">
                  <span className="float-left text-gridTitle">Fuel:</span>
                  <span className="float-right text-black">{carDetail? carDetail.fuel:"---"}</span>
                </li>
                <li className="border-b-2 py-4 ">
                  <span className="float-left text-gridTitle">
                    Engine Size:
                  </span>
                  <span className="float-right text-black">{carDetail? carDetail.engineSize + " L":"---"}</span>
                </li>
                <li className="border-b-2 py-4 ">
                  <span className="float-left text-gridTitle">Gear Box:</span>
                  <span className="float-right text-black">{carDetail? carDetail.transmition:"---"}</span>
                </li>
                <li className="border-b-2 py-4">
                  <span className="float-left text-gridTitle">Body:</span>
                  <span className="float-right text-black">{carDetail? carDetail.body:"---"}</span>
                </li>
                <li className="border-b-2 py-4 ">
                  <span className="float-left text-gridTitle">Milage:</span>
                  <span className="float-right text-black">{carDetail? carDetail.milage.toLocaleString():"---"}</span>
                </li>
                <li className="border-b-2 py-4">
                  <span className="float-left text-gridTitle">Colour:</span>
                  <span className="float-right text-black">{carDetail? carDetail.colour:"---"}</span>
                </li>
                <li className="border-b-2 py-4">
                  <span className="float-left text-gridTitle">Doors:</span>
                  <span className="float-right text-black">{carDetail? carDetail.doors:"---"}</span>
                </li>
                <li className="border-b-2 py-4">
                  <span className="float-left text-gridTitle">Seats:</span>
                  <span className="float-right text-black">{carDetail? carDetail.seats:"---"}</span>
                </li>
                <li className="py-4">
                  <span className="float-left text-gridTitle">BHP:</span>
                  <span className="float-right text-black">{carDetail? carDetail.bhp:"---"}</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-center items-center bg-primary px-3 py-5 text-white w-72 rounded mb-3 cursor-pointer">
              <BsTelephoneOutboundFill />
              <p className="text-white text-center text-xl pl-5">
                079 27296640
              </p>
            </div>
            <div className="flex justify-center items-center bg-white px-3 py-5 text-primary w-72 rounded mb-3 cursor-pointer border-primary border hover:bg-primary hover:text-white">
              <HiOutlineMail className="text-xl" />
              <p className="text-center text-xl pl-2">Email Us</p>
            </div>
          </div>
        </div>

        <Tabs description={carDetail?.description} features={carDetail?.features} />
      </div>
    </>
  );
};
