import { PatternFormat } from "react-number-format";
import { useField } from "formik";

interface FormInputProps {
  label: string;
  name: string;
  hidden?: boolean;
  handleSearch?: () => void;
  className?: string;
  mt?: boolean;
  cantidad?: string;
}
export default function InputSearch({
  label,
  className,
  hidden,
  handleSearch,
  mt,
  cantidad,
  ...props
}: FormInputProps) {
  const [field, meta] = useField(props.name);
  const cantidadNumeros = cantidad
    ? new Array(Number(cantidad)).fill("#").join("")
    : new Array(Number(20)).fill("#").join("");

  return (
    <div className={` ${className ? className : ""} ${mt && " mt-5 "}`}>
      <div className="relative flex items-center">
        <PatternFormat
          id={props.name}
          format={cantidadNumeros}
          mask=""
          className={`${
            meta.error && meta.touched
              ? "block p-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none   border-red-600  focus:outline-none focus:ring-0 focus:border-red-600 peer"
              : "block p-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          }`}
          {...field}
          {...props}
          placeholder=" "
        />

        {hidden && (
          <button
            type="button"
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            onClick={handleSearch}
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        )}

        <label
          htmlFor={props.name}
          className={`${
            meta.error && meta.touched
              ? "text-red-500 peer-focus:text-red-500"
              : "text-gray-500 peer-focus:text-blue-600"
          } absolute text-sm  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1`}
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
