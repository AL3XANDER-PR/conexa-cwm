import { useField, useFormikContext } from "formik";
import ModalComponent from "../ModalComponent";
import { useState } from "react";
import {
  getPostalCode,
  NominatimResult,
} from "../../services/nominatimService";
import { FormDataValues } from "../../interfaces/FormInterface";

interface FormInputProps {
  label: string;
  name: string;
  type: string;
  className?: string;
  disabled?: boolean;
  mt?: boolean;
}
export default function InputWithModal({
  label,
  className,
  disabled,
  mt,
  ...props
}: FormInputProps) {
  const { setFieldValue } = useFormikContext<FormDataValues>();
  const [field, meta, helpers] = useField(props.name);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    helpers.setValue(value.toUpperCase());
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [address, setAddress] = useState<string>("");
  const [results, setResults] = useState<NominatimResult[]>([]);
  const [postalCode, setPostalCode] = useState<string | null>(null);
  const [selectedPostalCode, setSelectedPostalCode] = useState<string | null>(
    null
  );
  const [show, setShow] = useState<boolean>(false);

  const handleSearch = async () => {
    const result = await getPostalCode(address);
    if (result.length > 0) {
      setShow(true);
    } else {
      setShow(false);
    }

    setResults(result);
  };

  const handleSelect = (result: any) => {
    setAddress(result.display_name);
    setShow(false);
    setSelectedPostalCode(
      result.address?.postcode || "No postal code available"
    );
    setFieldValue("cod_postal", result.address?.postcode);
    setIsModalOpen(false);
    setResults([])
    setAddress('')
  };
  return (
    <>
      <div
        className={` ${className ? className : ""}`}
        onClick={handleOpenModal}
      >
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
            readOnly
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

      {isModalOpen && (
        <div className="fixed flex bg-black bg-opacity-50 px-4 overflow-x-hidden overflow-hidden  top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full ">
          <div className="relative  w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow ">
              <div className="flex items-center justify-between border-b p-2 md:py-4 md:px-5  rounded-t ">
                <h3 className="text-xl font-semibold text-gray-900 ">
                  {/* {title ? title : "Informacion"} */}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                  onClick={handleCloseModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close</span>
                </button>
              </div>

              <div className="p-4 md:p-5 ">
                {/* {children ? children : "Modal Info"} */}
                <div className="col-span-9 relative">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Dirección"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer "
                  />
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
                </div>
                <ul
                  className="py-3  overflow-y-auto text-sm text-gray-700 "
                  aria-labelledby="dropdownSearchButton"
                >
                  {results.map((result, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelect(result)}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center ps-2 rounded hover:bg-gray-100 ">
                        <label
                          htmlFor="checkbox-item-11"
                          className="w-full py-2 text-sm font-medium text-gray-900 rounded "
                        >
                          {result.display_name}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center py-2 px-4 md:p-5 border-t border-gray-200 rounded-b">
                <button
                  data-modal-hide="static-modal"
                  type="button"
                  className="py-2.5 px-5 ms-auto text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
                  onClick={handleCloseModal}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
