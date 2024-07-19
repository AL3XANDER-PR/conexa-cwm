import { useFormikContext } from "formik";
import { MONEDA, TIPO_PARTICIPE } from "../../constants/constants";
import SelectInput from "../../shared/FormInputs/SelectInput";
import TextInput from "../../shared/FormInputs/TextInput";
import { FormDataValues } from "../../interfaces/FormInterface";
import { IconMoneda } from "../../assets/icons/Icons";
import InputImporte from "../../shared/FormInputs/InputImporte";
import Modal from "../Modal";
import { useEffect } from "react";

export default function StepInversion() {
  const { setFieldValue, touched, errors, getFieldProps, values } =
    useFormikContext<FormDataValues>();

  useEffect(() => {
    if (values.tipoParticipe === "") return;
    setFieldValue("modalidadInversion", "");
    setFieldValue("tiempoInversion", "");
    setFieldValue("frecuenciaPagos", "");

    // General para ambos participes
    setFieldValue("modalidadInversion", "1");
    setFieldValue("frecuenciaPagos", "415");

    //para participes especificos
    if (values.tipoParticipe === TIPO_PARTICIPE.A) {
      setFieldValue("tiempoInversion", "911");
    }

    if (values.tipoParticipe === TIPO_PARTICIPE.B) {
    }
  }, [values.tipoParticipe]);

  return (
    <section className="grid gap-4 gap-y-2 text-sm grid-cols-1 sm:grid-cols-12">
      <h3 className="col-span-12 mb-0 font-semibold text-gray-900 text-sm flex flex-row gap-1 ">
        Tipo de Participe:
        <Modal />
      </h3>
      <ul className="col-span-12 grid w-full gap-1 lg:gap-6 grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        <li>
          <input
            type="radio"
            id="p_clase_A"
            {...getFieldProps("tipoParticipe")}
            value={TIPO_PARTICIPE.A}
            className="hidden peer"
            checked={values.tipoParticipe === TIPO_PARTICIPE.A}
          />
          <label
            htmlFor="p_clase_A"
            className="inline-flex items-center justify-between w-full px-4 py-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer  peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 peer-checked:bg-blue-100"
          >
            <div className="flex flex-row gap-4 w-full">
              <div className="h-10 w-10 rounded-full   flex items-center justify-center">
                <span className="font-semibold text-xl text-center">A</span>
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="font-semibold ">Partícipe Clase A</h4>
                <p className=" text-sm hidden xl:block">
                  Mayor Rendimiento proyectado.
                </p>
              </div>
            </div>
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="p_clase_B"
            {...getFieldProps("tipoParticipe")}
            value={TIPO_PARTICIPE.B}
            className="hidden peer"
            checked={values.tipoParticipe === TIPO_PARTICIPE.B}
          />
          <label
            htmlFor="p_clase_B"
            className="inline-flex items-center justify-between w-full px-4 py-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer  peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 peer-checked:bg-blue-200"
          >
            <div className="flex flex-row gap-4 w-full">
              <div className="h-10 w-10 rounded-full  flex items-center justify-center">
                <span className="font-semibold text-xl text-center">B</span>
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="font-semibold">Partícipe Clase B</h4>
                <p className=" text-sm hidden xl:block">
                  Rendimiento fijo garantizado.
                </p>
              </div>
            </div>
          </label>
        </li>
      </ul>
      <>
        {errors.tipoParticipe && touched.tipoParticipe && (
          <p className="col-span-12 mt-0.5 text-xs text-red-600 dark:text-red-400">
            {errors.tipoParticipe}
          </p>
        )}
      </>

      <h3 className="col-span-12 mt-2 mb-0 font-semibold text-gray-900 ">
        Moneda de la Inversión:
      </h3>
      <ul className="col-span-12 grid w-full gap-1 lg:gap-6 grid-cols-2">
        <li>
          <input
            type="radio"
            id="monedaPen"
            {...getFieldProps("monedaInversion")}
            value={MONEDA.PEN}
            className="hidden peer"
            checked={values.monedaInversion === MONEDA.PEN}
          />
          <label
            htmlFor="monedaPen"
            className="inline-flex items-center justify-between w-full px-5 py-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer  peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 peer-checked:bg-blue-100"
          >
            <div className="flex flex-row gap-4 w-full">
              <div className="h-12 w-12 rounded-full border flex items-center justify-center">
                <IconMoneda tipo="PEN" />
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="font-semibold ">PEN</h4>
                <p className=" text-xs hidden lg:block">
                  Contrato de Inversión PEN.
                </p>
              </div>
            </div>
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="monedaUsd"
            {...getFieldProps("monedaInversion")}
            value={MONEDA.USD}
            className="hidden peer"
            checked={values.monedaInversion === MONEDA.USD}
          />
          <label
            htmlFor="monedaUsd"
            className="inline-flex items-center justify-between w-full px-5 py-2 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer  peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 peer-checked:bg-blue-100"
          >
            <div className="flex flex-row gap-4 w-full">
              <div className="h-12 w-12 rounded-full border flex items-center justify-center">
                <IconMoneda tipo="USD" />
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="font-semibold">USD</h4>
                <p className=" text-xs hidden lg:block">
                  Contrato de Inversión USD
                </p>
              </div>
            </div>
          </label>
        </li>
      </ul>
      <>
        {errors.monedaInversion && touched.monedaInversion && (
          <p className="col-span-12 mt-0.5 text-xs text-red-600 dark:text-red-400">
            {errors.monedaInversion}
          </p>
        )}
      </>

      <InputImporte
        name="djImporte"
        label="Importe:"
        className="col-span-12 sm:col-span-6"
        mt
        prefix={values.monedaInversion === MONEDA.USD ? "$ " : "S/ "}
      />

      <SelectInput
        label="Modalidad"
        textDefault="seleccione"
        name="modalidadInversion"
        className="col-span-12 sm:col-span-6 "
        options={[
          {
            id_catalogo: 1,
            nombre: "Con Distribución",
          },
          {
            id_catalogo: 2,
            nombre: "Con Reinversión",
          },
        ]}
        disabled={values.tipoParticipe === TIPO_PARTICIPE.B}
        modal
      >
        <div className="py-2 w-full bg-white border border-gray-200 rounded-lg shadow ">
          <img
            src="https://img.icons8.com/external-nawicon-mixed-nawicon/64/228BE6/external-Cash-Flow-investment-nawicon-mixed-nawicon.png"
            className="mx-auto h-16"
            alt="external-Cash-Flow-investment-nawicon-mixed-nawicon"
          />
          <div className="px-5 py-2">
            <div>
              <h5 className="text-xl font-semibold tracking-tight text-gray-700 text-center">
                Reinversión
              </h5>
              <p className="mb-3 text-xs font-normal text-gray-700 text-center">
                Mayor rendimiento proyectado
              </p>
            </div>
            <div className="mb-3 text-xs font-normal text-gray-700 ">
              <p className="mb-2 ">
                Los rendimientos generados se sumarán al importe invertido al
                cierre de cada trimestre lo que genera un capital mayor y asi
                mayores rendimientos
                <br />
              </p>
            </div>
          </div>
        </div>
        <div className="py-2 w-full bg-white border border-gray-200 rounded-lg shadow ">
          <img
            src="https://img.icons8.com/external-xnimrodx-lineal-xnimrodx/64/228BE6/external-cash-flow-startup-business-xnimrodx-lineal-xnimrodx-2.png"
            className="mx-auto h-16"
            alt="external-cash-flow-startup-business-xnimrodx-lineal-xnimrodx-2"
          />
          <div className="px-5 py-2">
            <div>
              <h5 className="text-xl font-semibold tracking-tight text-gray-700 text-center">
                Distribución
              </h5>
              <p className="mb-3 text-xs font-normal text-gray-700 text-center">
                Rendimiento fijo garantizado
              </p>
            </div>
            <div className="mb-3 text-xs font-normal text-gray-700 ">
              <p className="mb-2 ">
                {values.tipoParticipe !== "" &&
                  values.tipoParticipe === TIPO_PARTICIPE.A &&
                  "- Distribución Clase A: Se realizará el pago en la cuenta bancaria del partícipe dentro de los 15 días próximos al cierre de cadatrimestre "}
                  {values.tipoParticipe !== "" &&
                  values.tipoParticipe === TIPO_PARTICIPE.B &&
                  "Distribución Clase B: Se realizará el pago en la cuenta bancaria del partícipe de acuerdo al cronograma y a la frecuencia de pagos elegida"}
                <br />
              </p>
            </div>
          </div>
        </div>
      </SelectInput>
      <SelectInput
        label="Plazo de inversion"
        textDefault="Seleccione"
        name="tiempoInversion"
        className="col-span-12 sm:col-span-6 "
        disabled={values.tipoParticipe === TIPO_PARTICIPE.A}
        idPadre={493}
      />

      <SelectInput
        label="Frecuencia de Pagos"
        textDefault="Seleccione"
        name="frecuenciaPagos"
        className="col-span-12 sm:col-span-6 "
        idPadre={412}
        ids={[417, 415, 414, 413]}
        sort
        disabled={values.tipoParticipe === TIPO_PARTICIPE.A}
      />

      <h3 className="col-span-12 mt-3 mb-0 font-semibold text-gray-900 ">
        Datos de Asesor Financiero:
      </h3>
      <TextInput
        name="nombreAsesor"
        type="text"
        label="Nombres:"
        className="col-span-12"
      />
      {/* <TextInput
                  name="nroDocumentoAsesor"
                  type="text"
                  label="DNI:"
                  className="col-span-12 sm:col-span-6 lg:col-span-4"
                /> */}
    </section>
  );
}
