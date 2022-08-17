import { useRef, useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";

export const FormLocationInput = ({
  values = [],
  selectedValue,
  onSelect,
  name
}) => {
  return (
      <div className="relative mt-3">
        <select
          value={selectedValue}
          onChange={(ev) => onSelect(ev.target.value)}
          className="border border-primary px-2 py-1 w-60 rounded text-black bg-transparent focus:outline-none capitalize"
        >
          <option className="">{`Any ${name}`}</option>
          {values.length !== 0 &&
            values.map((value, index) => (
              <option className="capitalize" key={index}>
                             {value.toLocaleString()}
              </option>
            ))}
        </select>
      </div>
  );
};
