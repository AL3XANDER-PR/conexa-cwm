import { useField } from "formik";

interface FormInputProps {
  label: string;
  name: string;
  type: string;
  className?: string;
  disabled?: boolean;
  mt?: boolean;
}
export default function TextInput({
  label,
  className,
  disabled,
  mt,
  ...props
}: FormInputProps) {
  const [field, meta, helpers] = useField(props.name);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    helpers.setValue(value.toUpperCase());
  };
  return (
    <div className={` ${className ? className : ""}`}>
      <div
        className={`relative flex items-center ${mt && "mt-5 "} ${
          disabled &&
          "bg-gray-100  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 cursor-not-allowed "
        }`}
      >
        <input
          id={props.name}
          className={`${disabled && ""}
            ${
              meta.error && meta.touched
                ? "block p-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none   border-red-600  focus:outline-none focus:ring-0 focus:border-red-600 peer"
                : "block p-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            }`}
          disabled={disabled}
          {...field}
          {...props}
          onChange={handleChange}
          placeholder=" "
        />
        <label
          htmlFor={props.name}
          className={`${
            disabled ? "cursor-not-allowed bg-gray-100" : "bg-white"
          } ${
            meta.error && meta.touched
              ? "text-red-500 peer-focus:text-red-500"
              : "text-gray-500 peer-focus:text-blue-600"
          } absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-2 z-0 origin-[0]  px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
        >
          {label}
        </label>
      </div>
      {meta.error && meta.touched && (
        <p className="mt-0.5 text-xs text-red-600 dark:text-red-400">
          {meta.error}
        </p>
      )}
    </div>
  );
}
