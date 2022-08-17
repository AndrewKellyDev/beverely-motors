import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Corsa from "../../assets/images/Corsa.jpeg";
import axios from "axios";
import Swal from "sweetalert2";
import { api_url } from "../../config/api";

export const AdminPage = () => {
  const [cars, setCars] = useState();

  const navigate = useNavigate();

  const fetchCars = async ()=>{
    try {
      axios
        .get(`${api_url}/Cars/`)
        .then((res) => {
          console.log(res);
          setCars(res.data);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
  
    fetchCars()
  }, []);

  const HandleDelete = (postId) => {
    try {
      axios
        .delete(`${api_url}/Cars/${postId}`)
        .then((res) => {
          Swal.fire({
            title: "Successfully Removed Car Car!",
            text: `Your Post Has Been Successfully Removed.`,
            icon: "success",
            confirmButtonText: "Close",
          });
          fetchCars()
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }

  const HandleSold = (postId, sold) => {
    try {
      axios
        .patch(`${api_url}/Cars/${postId}` , {sold: sold === "true"?"false":"true"})
        .then((res) => {
          Swal.fire({
            title: sold === "true"?"Successfully Set Car As Unsold!":"Successfully Set Car As Sold!" ,
            text: sold === "true"?`You car has now been set to unsold.`:`You car has now been set to sold.` ,
            icon: "success",
            confirmButtonText: "Close",
          });
          fetchCars()
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="bg-white">
        <div className="py-32 lg:px-10% px-5%">
          <div className="flex flex-row w-full items-center justify-between">
            <p className="uppercase bold text-2xl font-bold float-left">
              Your Stock
            </p>
            <button
              className="bg-primary px-6 py-2 text-white rounded"
              onClick={() => navigate("/addcar")}
            >
              Add A Car
            </button>
          </div>
          <div className="flex flex-wrap justify-center">
            {cars
              ? cars.map((item, index) => {
                return (
                  <div className="carDetails mt-20 shadow-sm mx-2" key={index}>
                    <div className="flex sm:flex-row flex-col justify-center items-center">
                      <img
                        src={item.carImg ? process.env.REACT_APP_SUPABASE_BUCKEDT_URL+item.carImg[0] : Corsa}
                        height={210}
                        width={210}
                      ></img>

                      <div className="flex flex-col sm:ml-10 ml-0 sm:mt-0 mt-4">
                        {/* <p className="font-bold uppercase mb-4 text-xl">
                          {item.title}
                        </p> */}
                        <div className="flex flex-col">
                          <div className="flex flex-row items-center justify-between mr-4">
                            <p className="font-bold mr-2">Price: </p>
                            <p>£{item.price.toLocaleString()}</p>
                          </div>

                          <div className="flex flex-row items-center justify-between mr-4">
                            <p className="font-bold mr-2">Transmition: </p>
                            <p>{item.transmition}</p>
                          </div>

                          <div className="flex flex-row items-center justify-between mr-4">
                            <p className="font-bold mr-2">Fuel: </p>
                            <p>{item.fuel}</p>
                          </div>

                          <div className="flex flex-row items-center justify-between mr-4">
                            <p className="font-bold mr-2">Miles: </p>
                            <p>{item.milage.toLocaleString()}</p>
                          </div>

                          <div className="flex flex-row items-center justify-between mr-4">
                            <p className="font-bold mr-2">Colour: </p>
                            <p>{item.colour}</p>
                          </div>

                          <div className="flex flex-row items-center justify-between mr-4">
                            <p className="font-bold mr-2">Doors: </p>
                            <p>{item.doors}</p>
                          </div>

                          <div className="flex flex-row items-center justify-between mr-4">
                            <p className="font-bold mr-2">BHP: </p>
                            <p>{item.bhp}</p>
                          </div>
                        </div>

                      </div>

                      <div className="flex flex-col sm:ml-5 ml-0 sm:mt-0 mt-5 font-NotoSans ">
                      <NavLink to={`/edit/${item._id}`} className="flex flex-col justify-center items-center bg-white border border-edit px-3 py-2 text-edit w-36 rounded mb-3 cursor-pointer hover:bg-edit hover:text-white">
                        <p className="text-center">Edit Post</p>
                      </NavLink>
                      <div className="flex flex-col justify-center items-center bg-white border border-sold px-3 py-2 text-sold w-36 rounded mb-3 cursor-pointer hover:bg-sold hover:text-white" onClick={() => HandleSold(item._id, item.sold)}>
                        <p className="text-center">{item.sold === "true"? "Unmark Sold":"Mark Sold"}</p>
                      </div>
                      <div className="flex flex-col justify-center items-center bg-white border border-delete px-3 py-2 w-36 rounded mb-3 cursor-pointer text-delete hover:bg-delete hover:text-white" onClick={() => HandleDelete(item._id)}>
                        <p className="text-center">Delete</p>
                      </div>
                      </div>
                    </div>
                  </div>
                );
              })
              : "No cars"}
          </div>
        </div>
      </div>
    </>
  );
};
