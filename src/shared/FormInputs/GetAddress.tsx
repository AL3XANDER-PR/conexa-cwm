// import React, { useState } from 'react';
// import { getPostalCode } from '../../services/getCodigoPostalService';

// const SearchAddress: React.FC = () => {
//   const [address, setAddress] = useState<string>('');
//   const [postalCode, setPostalCode] = useState<string | null>(null);

//   const handleSearch = async () => {
//     const code = await getPostalCode(address);
//     console.log("💻 - file: GetAddress.tsx:10 - handleSearch - code:", code)

//     setPostalCode(code);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={address}
//         onChange={(e) => setAddress(e.target.value)}
//         placeholder="Enter address"
//       />
//       <button onClick={handleSearch}>Search</button>
//       {postalCode && <p>Postal Code: {postalCode}</p>}
//     </div>
//   );
// };

// export default SearchAddress;

import React, { useState } from "react";
import {
  getPostalCode,
  NominatimResult,
} from "../../services/nominatimService";

const SearchAddress: React.FC = () => {
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
  };

  return (
    <>
      <div className="col-span-12 relative grid grid-cols-12 gap-3">
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
        <div className="col-span-3">
          <input
            type="text"
            value={selectedPostalCode ? selectedPostalCode : ""}
            placeholder="Cod Postal"
            className="block p-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
        </div>

        <div
          id="dropdownSearch"
          className="z-50 bg-white rounded-lg shadow w-full absolute top-11"
        >
          {show && (
            <ul
              className=" px-3 py-3  overflow-y-auto text-sm text-gray-700 "
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
          )}
        </div>
      </div>
      {/* {selectedPostalCode && <p>Postal Code: {selectedPostalCode}</p>} */}
    </>
  );
};

export default SearchAddress;
