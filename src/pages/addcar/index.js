import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { Carousel } from "react-responsive-carousel";
import { AiFillPlusCircle, AiTwotoneDelete } from "react-icons/ai";
import { Dropzone, ResponsiveCarousel } from "../../components";
import { defaultFeatures } from "../../config/utility";
import { api_url } from "../../config/api";
import { supabase } from "../../supabase";

export const AddNewCarPage = () => {
  const [pending, setPending] = useState(false);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState();
  const [fuel, setFuel] = useState("");
  const [engineSize, setEngineSize] = useState("");
  const [transmition, setTransmition] = useState("");
  const [body, setBody] = useState("");
  const [milage, setMilage] = useState();
  const [color, setColor] = useState("");
  const [doors, setDoors] = useState();
  const [seats, setSeats] = useState();
  const [bhp, setBhp] = useState();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [carImages, setCarImages] = useState([]);
  const [AddedFeatures, setAddedFeatures] = useState(defaultFeatures);
  const [features, setFeatures] = useState([]);
  const newFeatureRef = useRef(null);
  const onFileUpload = (file) => {
    setCarImages([...file, ...carImages]);
  };

  const sendAddCar = async (ev) => {
    ev.preventDefault();

    if (carImages.length === 0 || pending) {
      return;
    }
    setPending(true);
    const carUploadedPath = [];
    for (const carImage of carImages) {
      const fileName = `${Math.random()}${carImage.name}`;
      const { error: uploadError } = await supabase.storage
        .from("car-image")
        .upload(fileName, carImage);
      if (uploadError) {
        console.log(uploadError);
      } else {
        console.log("image upload suceess");
        carUploadedPath.push(fileName);
      }
    }

    const data = {
      make: make.toLocaleLowerCase(),
      model: model.toLocaleLowerCase(),
      year,
      fuel: fuel.toLocaleLowerCase(),
      engineSize,
      transmition: transmition.toLocaleLowerCase(),
      body: body.toLocaleLowerCase(),
      milage,
      colour: color.toLocaleLowerCase(),
      doors,
      seats,
      bhp,
      description,
      price,
      features,
      carImg: carUploadedPath,
    };

    axios
      .post(`${api_url}/Cars/add`, data)
      .then((res) => {
        console.log(res);
        setPending(false);
        if (res.data?.message?.errors) Swal.fire("Error");
        else {
          Swal.fire({
            title: "Successfully Added Car!",
            text: `${make} ${model} has successfully be added to your collection`,
            icon: "success",
            confirmButtonText: "Close",
          });
          setMake("");
          setModel("");
          setYear("");
          setFuel("");
          setEngineSize("");
          setTransmition("");
          setBody("");
          setMilage("");
          setColor("");
          setDoors("");
          setSeats("");
          setBhp("");
          setDescription("");
          setPrice("");
          setCarImages([]);
          newFeatureRef.current.value = "";
          setAddedFeatures(defaultFeatures);
          setFeatures([]);
        }
      })
      .catch((error) => {
        console.log(error);

        setPending(false);
      });
  };

  const handleNewFeature = (ev) => {
    ev.preventDefault();
    if (newFeatureRef.current.value === "") {
      return;
    }
    if (AddedFeatures.includes(newFeatureRef.current.value)) {
      Swal.fire("That is already on list");
    } else {
      setAddedFeatures([...AddedFeatures, newFeatureRef.current.value]);
      setFeatures([...features, newFeatureRef.current.value]);
      newFeatureRef.current.value = "";
    }
  };

  const onRemove = (image) => {
    setCarImages(
      carImages.filter((carImageFile) => {
        return (
          carImageFile.path !== image.path && carImageFile.size !== image.size
        );
      })
    );
  };

  return (
    <>
      <div className="bg-white py-20 sm:px-20 px-4">
        <div>
          <form onSubmit={sendAddCar} className="flex flex-col justify-center">
            <p className="uppercase bold text-xl font-bold text-center mb-10">
              Add a new car
            </p>
            <div className="flex flex-wrap justify-center">
              <div className="flex justify-center items-center lg:mr-10 mr-0 mb-10">
                <Dropzone
                  selectedFileLength={carImages.length}
                  onFileUploaded={onFileUpload}
                />
              </div>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mb-10">
                <div className="flex flex-col ">
                  <p className="mb-2 font-NotoSans">Make: </p>
                  <input
                    type="text"
                    name="make"
                    className="pl-2 border border-black rounded"
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col ">
                  <p className="mb-2 font-NotoSans">Model: </p>
                  <input
                    type="text"
                    name="model"
                    className="pl-2 border border-black rounded"
                    onChange={(e) => setModel(e.target.value)}
                    value={model}
                    required
                  />
                </div>

                <div className="flex flex-col ">
                  <p className="mb-2 font-NotoSans">Year: </p>
                  <input
                    type="text"
                    name="year"
                    className="pl-2 border border-black rounded"
                    onChange={(e) => setYear(e.target.value)}
                    value={year}
                    required
                  />
                </div>

                <div className="flex flex-col ">
                  <p className="mb-2 font-NotoSans">Fuel: </p>
                  <input
                    type="text"
                    name="fuel"
                    className="pl-2 border border-black rounded"
                    onChange={(e) => setFuel(e.target.value)}
                    value={fuel}
                    required
                  />
                </div>

                <div className="flex flex-col ">
                  <p className="mb-2 font-NotoSans">Engine Size: </p>
                  <input
                    type="text"
                    name="engine_size"
                    className="pl-2 border border-black rounded"
                    onChange={(e) => setEngineSize(e.target.value)}
                    value={engineSize}
                    required
                  />
                </div>

                <div className="flex flex-col ">
                  <p className="mb-2 font-NotoSans">Transmission: </p>
                  <input
                    type="text"
                    name="transmition"
                    className="pl-2 border border-black rounded"
                    onChange={(e) => setTransmition(e.target.value)}
                    value={transmition}
                    required
                  />
                </div>

                <div className="flex flex-col ">
                  <p className="mb-2 font-NotoSans">Body: </p>
                  <input
                    type="text"
                    name="body"
                    className="pl-2 border border-black rounded"
                    onChange={(e) => setBody(e.target.value)}
                    value={body}
                    required
                  />
                </div>

                <div className="flex flex-col ">
                  <p className="mb-2 font-NotoSans">Mileage: </p>
                  <input
                    type="number"
                    name="milage"
                    className="pl-2 border border-black rounded"
                    onChange={(e) => setMilage(e.target.value)}
                    value={milage}
                    required
                  />
                </div>

                <div className="flex flex-col ">
                  <p className="mb-2 font-NotoSans">Colour: </p>
                  <input
                    type="text"
                    name="colour"
                    className="pl-2 border border-black rounded"
                    onChange={(e) => setColor(e.target.value)}
                    value={color}
                    required
                  />
                </div>

                <div className="flex flex-col ">
                  <p className="mb-2 font-NotoSans">Doors: </p>
                  <input
                    type="number"
                    name="doors"
                    className="pl-2 border border-black rounded"
                    onChange={(e) => setDoors(e.target.value)}
                    value={doors}
                    required
                  />
                </div>

                <div className="flex flex-col ">
                  <p className="mb-2 font-NotoSans">Seats: </p>
                  <input
                    type="number"
                    name="seats"
                    className="pl-2 border border-black rounded"
                    onChange={(e) => setSeats(e.target.value)}
                    value={seats}
                    required
                  />
                </div>

                <div className="flex flex-col ">
                  <p className="mb-2 font-NotoSans">BHP: </p>
                  <input
                    type="number"
                    name="bhp"
                    className="pl-2 border border-black rounded"
                    onChange={(e) => setBhp(e.target.value)}
                    value={bhp}
                    required
                  />
                </div>

                <div className="flex flex-col ">
                  <p className="mb-2 font-NotoSans">Price: </p>
                  <input
                    type="number"
                    name="price"
                    className="pl-2 border border-black rounded"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    required
                  />
                </div>

                <div className="flex flex-col h-auto lg:col-span-3 md:col-span-2 col-span-1">
                  <p className="mb-2 font-NotoSans">Description: </p>
                  <textarea
                    rows={6}
                    type="text"
                    name="description"
                    className="pl-2 border border-black rounded"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    required
                  />
                </div>

                <div className="flex flex-col h-auto lg:col-span-3 md:col-span-2 col-span-1">
                  <p className="mb-2 font-NotoSans">Features: </p>
                  <div className="grid grid-cols-3">
                    {AddedFeatures.map((feature, index) => (
                      <div className="mt-2" key={index}>
                        <label className="cursor-pointer">
                          <input
                            checked={features.includes(feature)}
                            onChange={() => {
                              if (features.includes(feature)) {
                                setFeatures(
                                  features.filter((f) => f !== feature)
                                );
                              } else setFeatures([...features, feature]);
                            }}
                            className="mr-1"
                            type={"checkbox"}
                          />
                          {feature}
                        </label>
                      </div>
                    ))}
                    <div>
                      <input
                        ref={newFeatureRef}
                        className="pl-2 border border-black rounded mt-2"
                      />
                      <button
                        onClick={(ev) => {
                          handleNewFeature(ev);
                        }}
                        className="ml-2"
                      >
                        <AiFillPlusCircle />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-4xl mx-auto">
              <Carousel>
                {carImages.map((image, index) => (
                  <div
                    className="flex flex-col justify-center items-end"
                    key={index}
                  >
                    <img src={URL.createObjectURL(image)} />
                    <button
                      onClick={(ev) => {
                        ev.preventDefault();
                        onRemove(image);
                      }}
                      className="text-3xl z-10 mr-10"
                    >
                      <AiTwotoneDelete />
                    </button>
                  </div>
                ))}
              </Carousel>
            </div>
            <button
              className="bg-primary px-6 py-2 text-white rounded-xl lg:ml-8 lg-4 mt-6"
              type="submit"
            >
              {pending ? "Submitting" : "Add car"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
