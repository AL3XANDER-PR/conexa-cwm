import React, { useState, useEffect } from "react";
import { useFormikContext } from "formik";
import { getPais, getUbigeo } from "../../services/apiService";
import { FormDataValues } from "../../interfaces/FormInterface";

interface District {
  id_pais: number;
  nombre: string;
  nombre_corto: string;
  id_nivel: string;
  codigo: string;
}

interface Province {
  id_pais: number;
  nombre: string;
  nombre_corto: string;
  id_nivel: string;
  codigo: string;
}

export interface Department {
  id_pais: number;
  nombre: string;
  nombre_corto: string;
  id_nivel: string;
  codigo: string;
}

export interface Country {
  id_pais: number;
  nombre: string;
  nombre_corto: string;
}

const SelectDirection: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(false);

  const [departments, setDepartments] = useState<Department[]>([]);
  const [loadingDepartments, setLoadingDepartments] = useState(false);

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loadingProvinces, setLoadingProvinces] = useState(false);

  const [districts, setDistricts] = useState<District[]>([]);
  const [loadingDistricts, setLoadingDistricts] = useState(false);

  const [isOtherCountry, setIsOtherCountry] = useState(false);

  useEffect(() => {
    const getCountry = async () => {
      try {
        setLoadingCountries(true);
        const pais_params = { id_pais: 1, id_nivel: 1 };
        const response = await getPais("/pais/listar", pais_params);
        setCountries(response);
        setLoadingCountries(false);
        if (values.dir_pais === "") {
          setFieldValue("dir_pais", 1);
          handleCountryChange(1);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getCountry();
  }, []);

  const handleCountryChange = async (countryId: number) => {
    // buscar departamentos cuando se cambia el pais
    try {
      if (countryId !== 1) {
        setFieldValue("dir_departamento", "");
        setFieldValue("dir_provincia", "");
        setFieldValue("dir_distrito", "");

        setDepartments([]);
        setProvinces([]);
        setDistricts([]);

        setIsOtherCountry(true);
        return;
      }
      setIsOtherCountry(false);
      setLoadingDepartments(true);

      const params = { id_pais: countryId, id_nivel: 1 };
      const response = await getUbigeo("/ubigeo/listar", params);
      setFieldValue("dir_departamento", "");
      setDepartments(response);
      setFieldValue("dir_provincia", "");
      setProvinces([]);
      setFieldValue("dir_distrito", "");
      setDistricts([]);
      setLoadingDepartments(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDepartmentChange = async (departmentId: string) => {
    try {
      setLoadingProvinces(true);
      const params = { id_pais: 1, codigo: departmentId, id_nivel: 1 };
      const response = await getUbigeo("/ubigeo/listar", params);
      setProvinces(response);
      setDistricts([]);
      setFieldValue("dir_provincia", "");
      setFieldValue("dir_distrito", "");
      setLoadingProvinces(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleProvinceChange = async (provinceId: string) => {
    try {
      setLoadingDistricts(true);
      const params = { id_pais: 1, codigo: provinceId, id_nivel: 2 };
      const response = await getUbigeo("/ubigeo/listar", params);
      setDistricts(response);
      setFieldValue("dir_distrito", "");
      setLoadingDistricts(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const { values, errors, touched, getFieldProps, setFieldValue } =
    useFormikContext<FormDataValues>();

  return (
    <>
      <div className={"col-span-12 sm:col-span-3 relative"}>
        {true && (
          <label
            htmlFor={"dir_pais"}
            className="block mb-1 text-sm font-medium text-gray-700 "
          >
            {"Pais"}
          </label>
        )}
        <select
          id="dir_pais"
          className={`col-span-3 ${
            false &&
            "bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed "
          } border border-gray-300  rounded-lg focus:outline-none focus:ring-0 block p-2.5 w-full text-sm  ${
            errors.dir_distrito && touched.dir_distrito
              ? "border-red-500 focus:ring-red-500 focus:border-red-500 focus:text-red-500 text-red-500 "
              : "focus:ring-blue-500 focus:border-blue-500 text-gray-400"
          }s`}
          {...getFieldProps("dir_pais")}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            const countryId = parseInt(e.target.value);
            setFieldValue("dir_pais", countryId);
            handleCountryChange(countryId);
          }}
        >
          {loadingCountries ? (
            <option>Cargando...</option>
          ) : (
            <>
              <option value={""}>selecione</option>
              {countries.map((item, index) => {
                return (
                  <option key={`${index}`} value={item.id_pais}>
                    {item.nombre}
                  </option>
                );
              })}
            </>
          )}
        </select>
        {errors.dir_pais && touched.dir_pais && (
          <p className="mt-0.5 text-xs text-red-600 dark:text-red-400">
            {errors.dir_pais}
          </p>
        )}
      </div>

      <div className={"col-span-12 sm:col-span-3 relative"}>
        {true && (
          <label
            htmlFor={"dir_departamento"}
            className="block mb-1 text-sm font-medium text-gray-700 "
          >
            {"Departamento"}
          </label>
        )}
        <select
          id="dir_departamento"
          className={`col-span-3 ${
            isOtherCountry &&
            "bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed "
          } border border-gray-300  rounded-lg focus:outline-none focus:ring-0 block p-2.5 w-full text-sm  ${
            errors.dir_distrito && touched.dir_distrito
              ? "border-red-500 focus:ring-red-500 focus:border-red-500 focus:text-red-500 text-red-500 "
              : "focus:ring-blue-500 focus:border-blue-500 text-gray-400"
          }s`}
          {...getFieldProps("dir_departamento")}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            const deparmentId = e.target.value;
            setFieldValue("dir_departamento", deparmentId);
            handleDepartmentChange(deparmentId);
          }}
          disabled={isOtherCountry}
        >
          {loadingDepartments ? (
            <option>Cargando...</option>
          ) : (
            <>
              <option value={""}>
                {departments.length > 1 ? "selecione" : "----"}
              </option>
              {departments.map((item, index) => {
                return (
                  <option key={`${index}`} value={item.codigo}>
                    {item.nombre}
                  </option>
                );
              })}
            </>
          )}
        </select>
        {errors.dir_departamento && touched.dir_departamento && (
          <p className="mt-0.5 text-xs text-red-600 dark:text-red-400">
            {errors.dir_departamento}
          </p>
        )}
      </div>

      <div className={"col-span-12 sm:col-span-3 relative"}>
        {true && (
          <label
            htmlFor={"dir_provincia"}
            className="block mb-1 text-sm font-medium text-gray-700 "
          >
            {"Provincia"}
          </label>
        )}

        <select
          id="dir_provincia"
          className={`col-span-3 ${
            isOtherCountry &&
            "bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed "
          } border border-gray-300  rounded-lg focus:outline-none focus:ring-0 block p-2.5 w-full text-sm  ${
            errors.dir_distrito && touched.dir_distrito
              ? "border-red-500 focus:ring-red-500 focus:border-red-500 focus:text-red-500 text-red-500 "
              : "focus:ring-blue-500 focus:border-blue-500 text-gray-400"
          }s`}
          {...getFieldProps("dir_provincia")}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            const provinceId = e.target.value;
            setFieldValue("dir_provincia", provinceId);
            handleProvinceChange(provinceId);
          }}
          disabled={isOtherCountry}
        >
          {loadingProvinces ? (
            <option>Cargando...</option>
          ) : (
            <>
              <option value={""}>
                {provinces.length > 1 ? "selecione" : "----"}
              </option>
              {provinces.map((item, index) => {
                return (
                  <option key={`${index}`} value={item.codigo}>
                    {item.nombre}
                  </option>
                );
              })}
            </>
          )}
        </select>
        {errors.dir_provincia && touched.dir_provincia && (
          <p className="mt-0.5 text-xs text-red-600 dark:text-red-400">
            {errors.dir_provincia}
          </p>
        )}
      </div>

      <div className={"col-span-12 sm:col-span-3 relative"}>
        {true && (
          <label
            htmlFor={"dir_distrito"}
            className="block mb-1 text-sm font-medium text-gray-700 "
          >
            {"Pais"}
          </label>
        )}
        <select
          id="dir_distrito"
          className={`col-span-3 ${
            isOtherCountry &&
            "bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed "
          } border border-gray-300  rounded-lg focus:outline-none focus:ring-0 block p-2.5 w-full text-sm  ${
            errors.dir_distrito && touched.dir_distrito
              ? "border-red-500 focus:ring-red-500 focus:border-red-500 focus:text-red-500 text-red-500 "
              : "focus:ring-blue-500 focus:border-blue-500 text-gray-400"
          }s`}
          {...getFieldProps("dir_distrito")}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            const districtId = e.target.value;
            setFieldValue("dir_distrito", districtId);
          }}
          disabled={isOtherCountry}
        >
          {loadingDistricts ? (
            <option>Cargando...</option>
          ) : (
            <>
              <option value={""}>
                {districts.length > 1 ? "selecione" : "----"}
              </option>
              {districts.map((item, index) => {
                return (
                  <option key={`${index}`} value={item.codigo}>
                    {item.nombre}
                  </option>
                );
              })}
            </>
          )}
        </select>
        {errors.dir_distrito && touched.dir_distrito && (
          <p className="mt-0.5 text-xs text-red-600 dark:text-red-400">
            {errors.dir_distrito}
          </p>
        )}
      </div>
    </>
  );
};

export default SelectDirection;
