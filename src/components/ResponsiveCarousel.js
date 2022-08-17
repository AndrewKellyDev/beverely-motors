import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export const ResponsiveCarousel = ({ images = [], onRemoveImage }) => {
  return (
    <>
      <Carousel>
        {images.map((image, index) => (
          <div className="relative" key={index}>
            <img src={image?.path ? URL.createObjectURL(image) :process.env.REACT_APP_SUPABASE_BUCKEDT_URL+image} />
            {onRemoveImage && (
              <div onClick={()=>onRemoveImage(image)} className="absolute top-0 bg-black text-white left-0 right-0 py-2 cursor-pointer">
                Remove
              </div>
            )}
          </div>
        ))}
      </Carousel>
    </>
  );
};
