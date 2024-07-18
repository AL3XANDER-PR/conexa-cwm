// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useField } from "formik";
import { fetchDataP } from "../../services/apiService";
import ModalC from "../Modal";

interface Options {
  id_catalogo: number;
  nombre: string;
}

interface SelectInputProps {
  label?: string;
  textDefault?: string;
  name: string;
  className?: string;
  idPadre?: number;
  abvr?: boolean;
  disabled?: boolean;
  valor?: boolean;
  options?: Options[];
  ids?: number[];
  sort?: boolean;
  modal?: boolean;
  children?: string | React.ReactElement | React.ReactElement[];
}

export interface CatalogItem {
  date_create: string;
  app_name: string;
  id_user: string;
  username: string;
  id_catalogo: number;
  id_padre: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  abreviatura: string;
  valor: string;
  orden: number;
  estado: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  textDefault,
  name,
  className,
  idPadre,
  abvr,
  disabled,
  valor,
  options,
  ids,
  sort,
  modal,
  children,
}) => {
  const [field, meta] = useField(name);
  const [data, setData] = useState<CatalogItem[]>([]);
  const [valorInput, setValorInput] = useState<String>('');

  useEffect(() => {
    const getData = async () => {
      try {
        const params = { id_padre: idPadre };
        let obj_catalogo = [];
        const response = await fetchDataP("/formulario/listarxPadre", params);
        obj_catalogo = response;

        if (ids) {
          obj_catalogo = obj_catalogo.filter((item) =>
            ids.includes(item.id_catalogo)
          );
          setData(obj_catalogo);
          return;
        }
        if (sort) {
          obj_catalogo = obj_catalogo.sort((a, b) =>
            a.nombre.localeCompare(b.nombre)
          );
          setData(obj_catalogo);
          return;
        }

        setData(obj_catalogo);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (idPadre) {
      getData();
    }
  }, []);

  // useEffect(() => {
  //   const getName = (id: string) => {
  //     if (!id) return '' 
  //     let values;
  //     if (!idPadre) {
  //       values = options;
  //     } else {
  //       values = data;
  //     }

  //     if (id === "") return "";
  //     const res = values?.filter((item) => item.id_catalogo === Number(id))[0]
  //       ?.nombre;
  //     console.log("💻 - file: SelectInput.tsx:101 - getName - res:", res);
  //     if (res) {
  //       setValorInput(res);
  //     } else {
  //       setValorInput("");
  //     }
  //     return res;
  //     // console.log("💻 - file: SelectInput.tsx:98 - getName - res:", res)
  //   };

  //   getName(field.value);
  // }, [field.value]);

  return (
    <div className={className + " relative"}>
      {label && (
        <label
          htmlFor={name}
          className="flex mb-1 text-xs font-medium text-gray-700 justify-between"
        >
          {label}
          {modal && <ModalC title={label}>{children ? children : ""}</ModalC>}
        </label>
      )}
      {/* <input
        type="text"
        key={name + "_hidden"}
        name={name + "_hidden"}
        id={name + "_hidden"}
        value={valorInput}
        onChange={()=>{}}
      /> */}
      {valorInput}
      <select
        id={name}
        className={`${
          disabled &&
          "bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed "
        } border border-gray-300  rounded-lg focus:outline-none focus:ring-0 block p-2.5 w-full text-sm  ${
          meta.error && meta.touched
            ? "border-red-500 focus:ring-red-500 focus:border-red-500 focus:text-red-500 text-red-500 "
            : "focus:ring-blue-500 focus:border-blue-500 text-gray-400"
        }s`}
        {...field}
        disabled={disabled}
      >
        <option value="">{textDefault ? textDefault : "----"}</option>
        <>
          {idPadre
            ? data.map((item) => {
                return (
                  <option
                    key={item.id_catalogo}
                    value={valor ? item.valor : item.id_catalogo}
                  >
                    {abvr ? item.abreviatura : item.nombre}
                  </option>
                );
              })
            : options &&
              options.map((item) => {
                return (
                  <option key={item.id_catalogo} value={item.id_catalogo}>
                    {item.nombre}
                  </option>
                );
              })}
        </>
      </select>
      {meta.error && meta.touched && (
        <p className="mt-0.5 text-xs text-red-600 dark:text-red-400">
          {meta.error}
        </p>
      )}
    </div>
  );
};

export default SelectInput;
