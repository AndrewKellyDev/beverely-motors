import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BsFillHandThumbsUpFill } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import {
  FormTextInput,
  FormLocationInput,
  CarCard,
  BrandsBanner,
} from "../../components";
import CarImage from "../../assets/images/hero_image.png";
import AboutUsImage from "../../assets/images/about_us.png";
import { api_url } from "../../config/api";

export const HomePage = () => {
  const [recentCars, setRecentCars] = useState([]);
  const [makeValues, setMakeValues] = useState([]);
  const [modelValues, setModelValues] = useState([]);
  const [transmissionValues, setTransmissionValues] = useState([]);
  const [makeFilter, setMakeFilter] = useState("");
  const [modelFilter, setModelFilter] = useState("");
  const [transmission, setTransmission] = useState("");
  const [maxMileage, setMaxMileage] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${api_url}/cars/recentCars`)
      .then((res) => {
        setRecentCars(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get(`${api_url}/cars/getField/`, {
        params: { field: "make" },
      })
      .then((res) => setMakeValues(res.data));

    axios
      .get(`${api_url}/cars/getField/`, {
        params: { field: "transmition" },
      })
      .then((res) => setTransmissionValues(res.data));
  }, []);

  useEffect(() => {
    axios
      .get(`${api_url}/cars/getModelField/`, {
        params: { make: makeFilter },
      })
      .then((res) => setModelValues(res.data));
  }, [makeFilter]);

  const handleSearch = (ev) => {
    ev.preventDefault();
    navigate("/stock", {
      state: {
        make: makeFilter,
        model: modelFilter,
        milage: maxMileage,
        transmission: transmission,
      },
    });
  };

  return (
    <>
      <div className="pt-32 z-0 bg-gradient-to-b from-gradientFrom to-gradientTo lg:px-15% px-5%">
        <div className="flex md:flex-row flex-col-reverse sm:mb-32 mb-48 md:mt-32 mt-10">
          <div className="md:w-1/2 w-full">
            {/* <div className="flex items-center bg-white px-4 py-2 rounded-xl shadow-sm">
              <span className="text-secondary text-xl mr-4">
                <BsFillHandThumbsUpFill />
              </span>
              <div className="text-primary font-semibold">
                100% Satisfaction Guarantee
              </div>
            </div> */}
            <div className="font-bold sm:text-5xl text-2xl leading-loose font-Inter tracking-tight">
              The Best Preloved Vehicle Dealer In The UK
            </div>
            <div className="mt-10 font-Inter">
              Here at Beverley Commercials we offer only the best quality second hand
              vans, each vans is hand picked and checked over by our team to
              ensure that we only sell you the best quality vans on the market
              at the best price possible.
            </div>
            <div className="flex mt-10 flex-wrap">
              <a href="/#about" className="bg-primary hover:bg-hover text-white font-Inter py-3 px-6 mr-4 font-semibold mt-2">
                New Arrivals
              </a>
              <NavLink
                to="/stock"
                className="border text-primary border-primary font-Inter py-3 px-6 mr-4 font-semibold hover:bg-secondary hover:text-white hover:border-secondary mt-2"
              >
                All Vehicles
              </NavLink>
            </div>
          </div>
          <div className="relative md:mb-0 mb-10 z-0 md:w-1/2 w-full">
            <img src={CarImage} alt="car" />
            {/* <div className="absolute bg-fourth left-20 right-0 top-0 bottom-0 z-min-1 rounded-l-3xl" /> */}
          </div>
        </div>
        <div className="flex justify-center">
          <form
            onSubmit={(ev) => {
              handleSearch(ev);
            }}
            className=" bg-white text-black rounded flex mx-10 sm:px-10 px-2 py-8 md:-mt-16 sm:-mt-24 -mt-36 flex-wrap z-10 shadow-lg absolute max-w-7xl justify-center"
          >
            <div className="mx-2 mt-1">
              <FormLocationInput
                name="Manufacture"
                placeholder={"Manufacturer"}
                values={makeValues}
                onSelect={setMakeFilter}
                selectedValue={makeFilter}
              />
            </div>
            <div className="mx-2 mt-1">
              <FormLocationInput
                name="Model"
                values={modelValues}
                onSelect={setModelFilter}
                selectedValue={modelFilter}
              />
            </div>
            <div className="mx-2 mt-1">
              <FormLocationInput
                name="Maximum Mileage"
                selectedValue={maxMileage}
                onSelect={setMaxMileage}
                values={[
                  10000,
                  20000,
                  30000,
                  40000,
                  50000,
                  60000,
                  70000,
                  80000,
                  90000,
                  10000,
                  125000,
                  150000,
                  200000,
                ]}
              />
            </div>
            <div className="mx-2 mt-1">
              <FormLocationInput
                name="Transmission"
                values={transmissionValues}
                onSelect={setTransmission}
                selectedValue={transmission}
              />
            </div>
            <div className="self-end mx-2 mt-1">
              <button
                type="submit"
                className="flex items-center bg-primary hover:bg-hover px-8 py-2 mt-1 text-white rounded"
              >
                <span className="mr-1">
                  <AiOutlineSearch />
                </span>
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="bg-third lg:px-10% px-5% py-10 z-0">
        <div className="text-4xl lg:mt-20 md:mt-40 sm:mt-60 mt-60 mb-10 uppercase leading-snug text-center font-Inter font-bold tracking-tight">
          Our <span className="text-primary font-Inter">newest</span> arrivals
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          {recentCars.map((car, index) => (
            <CarCard car={car} key={index} />
          ))}
        </div>
      </div>

      <div
        className="bg-white grid md:grid-cols-2 grid-cols-1 lg:px-10% px-5% py-20 gap-10"
        id="about"
      >
        <div>
          <img src={AboutUsImage} alt="about us" />
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-4xl mb-5 font-Inter font-bold">About us</div>
          <div className="mb-5 font-Inter">
          Beverley Commercials is a quality used van dealership located in East Yorkshire.
            We source exceptional quality used vehicles for our customers right
            across UK and the Northern Ireland.
          </div>
          <div className="font-Inter">
            We pride ourselves on the quality service and professionalism
            provided to every customer we deal with.
          </div>
          <div className="mb-5 font-Inter">
            If you are looking for a new used van then feel free to browse our
            stock and get in touch should you have any questions.
          </div>
          <div className="font-Inter">
            if we don't stock what you're looking for, do not hesitate to
            contact our team as we may be able to source the perfect vehicle for
            you.
          </div>
        </div>
      </div>

      <div
        className="bg-white grid md:grid-cols-2 grid-cols-1 lg:px-10% px-5% py-20 gap-10"
        id="location"
      >
        <div className="flex flex-col justify-center">
          <div className="text-4xl mb-5 font-Inter font-bold">Our Location</div>
          <div className="mb-5 font-Inter">
          Beverley Commercials is located at, Swinemoor Ln, Beverley HU17 0JX. If you have any problems finding us we are located just behind Aldi.
          </div>
          <div className="font-Inter">
           If you still cannot find us please contact us on 07927296640
          </div>
        </div>
        <div className="sm:p-5 p-2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2353.9160826131233!2d-0.4105317841387478!3d53.84435644499213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4878c7619590a385%3A0x398f9975dcbdb6b8!2sSwinemoor%20Ln%2C%20Beverley%20HU17%200JX!5e0!3m2!1sen!2suk!4v1660241712183!5m2!1sen!2suk"
            style={{ border: "0", width: "100%", height: "100%" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  );
};
