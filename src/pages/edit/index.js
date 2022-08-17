import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AiFillPlusCircle } from "react-icons/ai";
import { Dropzone, ResponsiveCarousel } from "../../components";
import Swal from "sweetalert2";
import { api_url } from "../../config/api";
import { supabase } from "../../supabase";

export const EditCarPage = () => {
  const { id } = useParams();
  const [carDetail, setCarDetail] = useState();
  const [openTab, setOpenTab] = useState(1);
  const newFeatureRef = useRef(null);
  const [featureArrays, setFeatureArray] = useState([]);
  const [updatedFeatures, setUpdatedFeatures] = useState([]);
  const [addedCarImages, setAddedCarImages] = useState([]);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const getCarDetail = async () => {
      const _carDetail = await axios.get(`${api_url}/cars/getCarDetail`, {
        params: {
          id: id,
        },
      });
      setCarDetail(_carDetail.data);
      setFeatureArray(_carDetail.data.features);
      setUpdatedFeatures(_carDetail.data.features);
    };
    getCarDetail();
  }, [id]);

  const handleChange = (ev) => {
    setCarDetail({ ...carDetail, [ev.target.name]: ev.target.value });
  };
  const handleNewFeature = (ev) => {
    ev.preventDefault();
    if (newFeatureRef.current.value === "") {
      return;
    }
    if (updatedFeatures.includes(newFeatureRef.current.value)) {
      Swal.fire("That is already on list");
    } else {
      setUpdatedFeatures([...updatedFeatures, newFeatureRef.current.value]);
      setFeatureArray([...featureArrays, newFeatureRef.current.value]);
      newFeatureRef.current.value = "";
    }
  };

  const handleUpdate = async (ev) => {
    ev.preventDefault();
    if (updating) return;
    setUpdating(true);
    const carUploadedPath = [];
    if (addedCarImages.length !== 0) {
      for (const carImage of addedCarImages) {
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
    }
    await axios.patch(`${api_url}/cars/update/${id}`, {
      ...carDetail,
      features: updatedFeatures,
      carImg: [...carDetail.carImg, ...carUploadedPath],
    });
    setUpdating(false);
  };

  const onFileUpload = (file) => {
    setAddedCarImages([...file, ...addedCarImages]);
  };

  const onRemoveImage = (imagePath) => {
    if (imagePath?.path) {
      setAddedCarImages(
        addedCarImages.filter((image) => {
          return image.path !== imagePath.path && image.size !== imagePath.size;
        })
      );
    } else {
      setCarDetail({
        ...carDetail,
        carImg: carDetail.carImg.filter((image) => image !== imagePath),
      });
    }
  };
  return (
    <form onSubmit={handleUpdate}>
      <div className="py-40 lg:px-10% px-5%">
        <div className="flex mb-5 bg-secondary p-2 rounded text-white justify-center flex-wrap">
          <div>
            <div className="mb-1">Make</div>
            <input
              className="p-1"
              name="make"
              className="bg-transparent border-white border outline-none py-1 px-2 rounded"
              onChange={(ev) => handleChange(ev)}
              value={carDetail ? carDetail.make : "---"}
            />
          </div>
          <div className="ml-4">
            <div className="mb-1">Model</div>
            <input
              className="p-1"
              name="model"
              className="bg-transparent border-white border outline-none py-1 px-2 rounded"
              onChange={(ev) => handleChange(ev)}
              value={carDetail ? carDetail.model : "---"}
            />
          </div>
          <div className="ml-4">
            <div className="mb-1">Year</div>
            <input
              className="bg-transparent border-white border outline-none py-1 px-2 rounded"
              name="year"
              onChange={(ev) => handleChange(ev)}
              value={carDetail ? carDetail.year : "---"}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Dropzone
            selectedFileLength={addedCarImages.length}
            onFileUploaded={onFileUpload}
          />
        </div>
        <div className="flex flex-row mt-10 flex-wrap justify-center">
          {carDetail && (
            <ResponsiveCarousel
              onRemoveImage={onRemoveImage}
              images={[...carDetail.carImg, ...addedCarImages]}
            />
          )}
          <div className="Details pl-10">
            <div className="bg-black px-3 py-5 text-white w-72 rounded mb-3">
              <p className="text-white text-center text-xl">
                {carDetail && "£"}
                <input
                  name="price"
                  className="bg-black"
                  onChange={(ev) => handleChange(ev)}
                  value={carDetail ? carDetail.price.toLocaleString() : "---"}
                />
              </p>
            </div>

            <div className="DetailsForCar w-72 h-auto border-2 mb-3">
              <ul className="flex flex-col px-5 uppercase font-NotoSans leading-6 text-sm">
                <li className="border-b-2 py-4 flex justify-between">
                  <span className="text-gridTitle">Fuel:</span>
                  <input
                    className="text-black pl-2 w-32 text-right"
                    name="fuel"
                    onChange={(ev) => handleChange(ev)}
                    value={carDetail ? carDetail.fuel : "---"}
                  />
                </li>
                <li className="border-b-2 py-4 flex justify-between">
                  <span className="text-gridTitle">Engine Size:</span>
                  <span className="text-black">
                    <input
                      type={"number"}
                      className="w-20 pr-2 text-right"
                      name="engineSize"
                      onChange={(ev) => handleChange(ev)}
                      value={carDetail ? carDetail.engineSize : "---"}
                    />{" "}
                    {carDetail && " L"}
                  </span>
                </li>
                <li className="border-b-2 py-4 flex justify-between">
                  <span className="text-gridTitle">Gear Box:</span>
                  <input
                    className="text-black w-32 text-right"
                    name="transmition"
                    onChange={(ev) => handleChange(ev)}
                    value={carDetail ? carDetail.transmition : "---"}
                  />
                </li>
                <li className="border-b-2 py-4 flex justify-between">
                  <span className="text-gridTitle">Body:</span>
                  <input
                    className="text-black w-32 text-right"
                    name="body"
                    onChange={(ev) => handleChange(ev)}
                    value={carDetail ? carDetail.body : "---"}
                  />
                </li>
                <li className="border-b-2 py-4 flex justify-between">
                  <span className="text-gridTitle">Milage:</span>
                  <input
                    className="text-black w-32 text-right"
                    name="milage"
                    onChange={(ev) => handleChange(ev)}
                    value={
                      carDetail ? carDetail.milage.toLocaleString() : "---"
                    }
                  />
                </li>
                <li className="border-b-2 py-4 flex justify-between">
                  <span className="text-gridTitle">Colour:</span>
                  <input
                    className="text-black w-32 text-right"
                    name="colour"
                    onChange={(ev) => handleChange(ev)}
                    value={carDetail ? carDetail.colour : "---"}
                  />
                </li>
                <li className="border-b-2 py-4 flex justify-between">
                  <span className="text-gridTitle">Doors:</span>
                  <input
                    className="text-black w-32 text-right"
                    type={"number"}
                    name="doors"
                    onChange={(ev) => handleChange(ev)}
                    value={carDetail ? carDetail.doors : "---"}
                  />
                </li>
                <li className="border-b-2 py-4 flex justify-between">
                  <span className="text-gridTitle">Seats:</span>
                  <input
                    className="text-black w-32 text-right"
                    type={"number"}
                    name="seats"
                    onChange={(ev) => handleChange(ev)}
                    value={carDetail ? carDetail.seats : "---"}
                  />
                </li>
                <li className="py-4 flex justify-between">
                  <span className="text-gridTitle">BHP:</span>
                  <input
                    className="text-black w-32 text-right"
                    type={"number"}
                    name="bhp"
                    onChange={(ev) => handleChange(ev)}
                    value={carDetail ? carDetail.bhp : "---"}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full">
            <ul
              className="flex mb-0 list-none flex-wrap pt-3 flex-row"
              role="tablist"
            >
              <li className="-mb-px last:mr-0 text-center">
                <a
                  className={
                    "text-s font-Poppins font-bold uppercase px-5 py-5 shadow-lg block leading-normal " +
                    (openTab === 1
                      ? "text-white bg-black"
                      : "text-black bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                  data-toggle="tab"
                  href="#link1"
                  role="tablist"
                >
                  Description
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 text-center">
                <a
                  className={
                    "text-s font-Poppins font-bold uppercase px-5 py-5 shadow-lg block leading-normal " +
                    (openTab === 2
                      ? "text-white bg-black"
                      : "text-black bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle="tab"
                  href="#link2"
                  role="tablist"
                >
                  Features
                </a>
              </li>
            </ul>
            <div className="relative flex flex-col min-w-0 break-words bg-black text-white w-full mb-6 shadow-lg">
              <div className="px-4 py-5 flex-auto">
                <div className="tab-content tab-space">
                  <div
                    className={openTab === 1 ? "block" : "hidden"}
                    id="link1"
                  >
                    <textarea
                      name="description"
                      onChange={(ev) => handleChange(ev)}
                      className="text-l w-full font-Poppins text-black whitespace-pre leading-8 p-3"
                      value={carDetail ? carDetail.description : "---"}
                    ></textarea>
                  </div>
                  <div
                    className={
                      (openTab === 2 ? "block" : "hidden") + " grid grid-cols-3"
                    }
                    id="link2"
                  >
                    {featureArrays.length !== 0
                      ? featureArrays.map((feature, index) => (
                          <div className="mt-2" key={index}>
                            <label className="cursor-pointer">
                              <input
                                checked={updatedFeatures.includes(feature)}
                                onChange={() => {
                                  if (updatedFeatures.includes(feature)) {
                                    setUpdatedFeatures(
                                      updatedFeatures.filter(
                                        (f) => f !== feature
                                      )
                                    );
                                  } else
                                    setUpdatedFeatures([
                                      ...updatedFeatures,
                                      feature,
                                    ]);
                                }}
                                className="mr-1"
                                type={"checkbox"}
                              />
                              {feature}
                            </label>
                          </div>
                        ))
                      : "---"}
                    <div>
                      <input
                        ref={newFeatureRef}
                        className="pl-2 border text-black rounded mt-2"
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
          </div>
        </div>

        <button
          className="bg-primary px-6 py-2 text-white rounded-xl lg:ml-8 lg-4 mt-6"
          type="submit"
        >
          {updating ? "Updating" : "Update"}
        </button>
      </div>
    </form>
  );
};
