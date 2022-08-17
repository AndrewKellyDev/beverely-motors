import { useState } from "react";
import Corsa from "../assets/images/Corsa.jpeg";
export const Image = ({ src }) => {
  const [imgSrc, setImgSrc] = useState(src);

  const onError = () => {
    setImgSrc(Corsa);
  };
  return <img src={imgSrc} onError={onError} alt="custom_img" />;
};
