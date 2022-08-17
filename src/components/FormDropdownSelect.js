export const FormDropdownSelect = ({
  name,
  values = [],
  selectedValue,
  onSelect,
}) => {
  return (
    <div className="px-3 mb-4">
    {name &&  <div className="mb-3 text-base">{`Choose ${name}`}</div>}
      <select
        className="px-3 py-2 w-full bg-transparent border text-sm focus:outline-none capitalize"
        value={selectedValue}
        onChange={(ev) => onSelect(ev.target.value)}
      >
        <option className="bg-secondary">{`Any ${name}`}</option>
        {values.length !== 0 &&
          values.map((value, index) => (
            <option className="capitalize bg-secondary" key={index}>{name === "Max Price" || name === "Min Price" ? "£" : ""}
              {value.toLocaleString()}
            </option>
          ))}
      </select>
    </div>
  );
};
