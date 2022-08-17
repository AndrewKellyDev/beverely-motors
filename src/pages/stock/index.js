import { useEffect, useState } from "react";
import axios from "axios";
import { FormDropdownSelect } from "../../components";
import { CarCard } from "../../components";
import { useLocation } from "react-router-dom";
import { api_url } from "../../config/api";

const priceRange = [
  1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 12000, 14000,
  16000, 18000, 20000, 25000, 30000, 40000, 60000,
];

export const StockPage = () => {
  const location = useLocation()
  const [cars, setCars] = useState([]);
  const [makeFilter, setMakeFilter] = useState(location.state && !location.state.make.includes("Any") ? location.state.make : "");
  const [modelFilter, setModelFilter] = useState(location.state && !location.state.model.includes("Any") ? location.state.model : "");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [maxMileage, setMaxMileage] = useState(location.state?.milage ? location.state.milage : "");
  const [bodyStyle, setBodyStyle] = useState("");

  const [makeValues, setMakeValues] = useState([]);
  const [modelValues, setModelValues] = useState([]);
  const [bodyValues, setBodyValues] = useState([]);
  const [transmission, setTransmission] = useState(location.state && !location.state.transmission.includes("Any") ? location.state.transmission : "")
  useEffect(() => {
    axios
      .get(`${api_url}/cars/getField/`, {
        params: { field: "make" },
      })
      .then((res) => setMakeValues(res.data));

    axios
      .get(`${api_url}/cars/getField/`, {
        params: { field: "body" },
      })
      .then((res) => setBodyValues(res.data));
  }, []);

  useEffect(() => {
    axios
      .get(`${api_url}/cars/getModelField/`, {
        params: { make: makeFilter },
      })
      .then((res) => setModelValues(res.data));
      setModelFilter("")
  }, [makeFilter]);

  useEffect(() => {
    axios
      .get(`${api_url}/cars/`, {
        params: {
          make: makeFilter,
          model: modelFilter,
          minPrice: minPrice.slice(1).replace(/,/g, ""),
          maxPrice: maxPrice.slice(1).replace(/,/g, ""),
          maxMileage: maxMileage.replace(/,/g, ""),
          body: bodyStyle,
          transmission: transmission,
        },
      })
      .then((res) => {
        setCars(res.data);
      })
      .catch((error) => console.log(error));
  }, [makeFilter, modelFilter, minPrice, maxPrice, maxMileage, bodyStyle, transmission]);

  return (
    <div className="bg-white lg:px-10% px-5% py-10 z-0">
      <div className="font-bold sm:text-3xl text-xl mt-20 uppercase leading-snug mb-10 text-center text-primary font-Inter tracking-tighter">
        <span className="text-black">Our</span> Showroom
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mb-10 font-Inter bg-secondary text-white py-4 px-4 rounded shadow-xl max-w-8xl mx-auto">
        <FormDropdownSelect
          name="Make"
          selectedValue={makeFilter}
          onSelect={setMakeFilter}
          values={makeValues}
        />
        <FormDropdownSelect
          name="Model"
          selectedValue={modelFilter}
          onSelect={setModelFilter}
          values={modelValues}
        />
        <FormDropdownSelect
          name="Min Price"
          selectedValue={minPrice}
          onSelect={setMinPrice}
          values={priceRange}
        />
        <FormDropdownSelect
          name="Max Price"
          selectedValue={maxPrice}
          onSelect={setMaxPrice}
          values={priceRange}
        />
        <FormDropdownSelect
          name="Maximum Mileage"
          selectedValue={maxMileage}
          onSelect={setMaxMileage}
          values={[
            10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000,
            10000, 125000, 150000, 200000,
          ]}
        />
        <FormDropdownSelect
          name="Body Style"
          selectedValue={bodyStyle}
          onSelect={setBodyStyle}
          values={bodyValues}
        />
      </div>
      <div className="flex flex-wrap justify-center gap-5">
        {Array.isArray(cars) &&
          cars.length !== 0 &&
          cars.map((car, index) => <CarCard car={car} key={index} />)}
      </div>
    </div>
  );
};
