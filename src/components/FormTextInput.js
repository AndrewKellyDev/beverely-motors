export const FormTextInput = ({
  placeholder,
  onChange,
  value,
  type,
}) => {
  return (
    <div>
      <div className="relative mt-3">
        <input
          type={type}
          value={value}
          onChange={(ev) => onChange(ev.target.value)}
          className="border-primary border py-1 px-2 w-60 rounded text-black bg-transparent focus:outline-none"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};
