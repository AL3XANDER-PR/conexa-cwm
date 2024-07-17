import { useEffect, useState } from "react";
import TextInput from "../../shared/FormInputs/TextInput";
import { fetchDataP } from "../../services/apiService";
import { CatalogItem } from "../../shared/FormInputs/SelectInput";
import { FormDataValues } from "../../interfaces/FormInterface";
import { useFormikContext } from "formik";

export default function StepOrigenFondos() {
  const [origen, setOrigen] = useState<CatalogItem[]>([]);
  const { values, setFieldValue } = useFormikContext<FormDataValues>();

  useEffect(() => {
    const getData = async () => {
      try {
        const params = { id_padre: 494 };
        const response = await fetchDataP("/formulario/listarxPadre", params);

        setOrigen(response);
        const initialOptions = response.reduce((acc, option) => {
          acc[option.id_catalogo] = false;
          return acc;
        }, {} as { [key: string]: boolean });

        if (Object.keys(values.proviene).length !== 0) {
          setFieldValue("proviene", {
            ...values.proviene,
            "0": values.proviene["0"],
          });
        } else {
          setFieldValue("proviene", { ...initialOptions, "0": false });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [setFieldValue]);

  return (
    <section className="grid gap-4 gap-y-2 text-sm grid-cols-1 sm:grid-cols-12">
      <TextInput
        name="djPais"
        type="text"
        label="Pais de Origen:"
        className="col-span-12 "
      />

      <h3 className="col-span-12 mt-3 mb-0 font-semibold text-gray-900 ">
        Declaro que el dinero es lícito y proviene de las siguientes fuentes:
      </h3>
      <ul className="col-span-12 text-sm  text-gray-900 bg-white   rounded-lg grid md:grid-cols-2 gap-1 w-full">
        {origen.length > 1 ? (
          <>
            {origen.map((item) => {
              return (
                <li
                  className="w-full border border-gray-200 rounded-lg"
                  key={item.id_catalogo}
                >
                  <div className="flex items-center ps-3">
                    <input
                      id={item.valor}
                      type="checkbox"
                      name={`proviene.${item.id_catalogo}`}
                      checked={values.proviene[item.id_catalogo] === true}
                      onChange={() =>
                        setFieldValue(
                          `proviene.${item.id_catalogo}`,
                          !values.proviene[item.id_catalogo]
                        )
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 "
                    />
                    <label
                      htmlFor={item.valor}
                      className="w-full py-2.5 ms-2 text-sm font-medium text-gray-900 "
                    >
                      {item.nombre}
                    </label>
                  </div>
                </li>
              );
            })}
            <li className="w-full border border-gray-200 rounded-lg ">
              <div className="flex items-center ps-3">
                <input
                  id="cbx_otros"
                  type="checkbox"
                  name={`proviene.0`}
                  onChange={() =>
                    setFieldValue(`proviene.0`, !values.proviene["0"])
                  }
                  checked={values.proviene["0"] === true}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 "
                />
                <label
                  htmlFor="cbx_otros"
                  className="w-full py-2.5 ms-2 text-sm font-medium text-gray-900 "
                >
                  Otros
                </label>
              </div>
            </li>
            {values.proviene["0"] && (
              <li className="w-full  rounded-lg ">
                <TextInput
                  name="txt_otros"
                  type="text"
                  label="Especificar"
                  className=""
                />
              </li>
            )}
          </>
        ) : (
          <div className="col-span-12 animate-pulse grid md:grid-cols-2 gap-1 w-full ">
            {new Array(8).fill("#").map((_, index) => {
              return (
                <div
                  key={index}
                  className="w-full bg-gray-200 rounded-lg h-4 py-5"
                ></div>
              );
            })}
            <div className="w-full bg-gray-200 rounded-lg h-4 py-5"></div>
          </div>
        )}
      </ul>
    </section>
  );
}
