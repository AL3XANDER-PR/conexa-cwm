import { useFormikContext } from "formik";
import { FormDataValues } from "../interfaces/FormInterface";
import { BANCO, TIPO_PARTICIPE, TIPO_PERSONA } from "../constants/constants";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";

interface Props {
  handleConfirmCancel: () => void;
}
export default function Confirmation({ handleConfirmCancel }: Props) {
  const { values } = useFormikContext<FormDataValues>();
  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const onCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };
  const frecuenciaPagos = [
    { id: 413, nombre: "Anual" },
    { id: 414, nombre: "Semestral" },
    { id: 415, nombre: "Trimestral" },
    { id: 416, nombre: "Bimestral" },
    { id: 417, nombre: "Mensual" },
    { id: 418, nombre: "Quincenal" },
    { id: 419, nombre: "Diaria" },
    { id: 564, nombre: "Cuatrimestral" },
  ];

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg px-2 py-3 md:p-6 flex flex-col">
      <div className="text-center mb-6">
        <svg
          className="w-16 h-16 mx-auto text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h1 className="text-2xl font-bold text-blue-600">¡Listo!</h1>
        <p className="text-base mt-2">
          ¡Bien! Crearemos tu solicitud. al darle enviar confirma que sus datos
          son correctos.
        </p>
      </div>
      <div className="bg-gray-50 p-2 rounded-lg mb-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <tbody>
            <tr className="odd:bg-white  even:bg-gray-50  border-b ">
              <th
                scope="row"
                className="px-4 py-2 font-medium text-sm text-gray-900 whitespace-nowrap "
              >
                {values.tipoPersona === TIPO_PERSONA.NATURAL &&
                  "Nombes y Apellidos"}
                {values.tipoPersona === TIPO_PERSONA.JURIDICO && "Razon Social"}
              </th>
              <td className="px-4 py-2">
                {values.tipoPersona === TIPO_PERSONA.NATURAL &&
                  [
                    values.nombres,
                    values.apellidoPaterno,
                    values.apellidoMaterno,
                  ].join(" ")}

                {values.tipoPersona === TIPO_PERSONA.JURIDICO &&
                  values.razonSocial}
              </td>
            </tr>
            <tr className="odd:bg-white  even:bg-gray-50  border-b ">
              <th
                scope="row"
                className="px-4 py-2 font-medium text-sm text-gray-900 whitespace-nowrap "
              >
                Nro Documento
              </th>
              <td className="px-4 py-2">{values.nroDocumento}</td>
            </tr>
            <tr className="odd:bg-white  even:bg-gray-50  border-b ">
              <th
                scope="row"
                className="px-4 py-2 font-medium text-sm text-gray-900 whitespace-nowrap "
              >
                Email
              </th>
              <td className="px-4 py-2">{values.email}</td>
            </tr>
            <tr className="odd:bg-white  even:bg-gray-50  border-b ">
              <th
                scope="row"
                className="px-4 py-2 font-medium text-sm text-gray-900 whitespace-nowrap "
              >
                Celular
              </th>
              <td className="px-4 py-2">{values.celular}</td>
            </tr>
            <tr className="odd:bg-white  even:bg-gray-50  border-b row-span-2">
              <th
                scope="row"
                className="px-4 py-2 font-medium text-sm text-gray-900 whitespace-nowrap "
              >
                Tipo de Participe
              </th>
              <td className="px-4 py-2">
                {values.tipoParticipe === TIPO_PARTICIPE.A
                  ? "Clase A"
                  : "Clase B"}
              </td>
            </tr>
            <tr className="odd:bg-white  even:bg-gray-50  border-b row-span-2">
              <th
                scope="row"
                className="px-4 py-2 font-medium text-sm text-gray-900 whitespace-nowrap "
              >
                Importe de la Inversion
              </th>
              <td className="px-4 py-2">{values.djImporte}</td>
            </tr>
            <tr className="odd:bg-white  even:bg-gray-50  border-b row-span-2">
              <th
                scope="row"
                className="px-4 py-2 font-medium text-sm text-gray-900 whitespace-nowrap "
              >
                Modalidad
              </th>
              <td className="px-4 py-2">
                {values.modalidadInversion === "1"
                  ? "Con Distribución"
                  : "Con Reinversión"}
              </td>
            </tr>
            <tr className="odd:bg-white  even:bg-gray-50  border-b row-span-2">
              <th
                scope="row"
                className="px-4 py-2 font-medium text-sm text-gray-900 whitespace-nowrap "
              >
                Frecuencia de pagos
              </th>
              <td className="px-4 py-2">
                {
                  frecuenciaPagos.filter(
                    (item) => item.id === Number(values.frecuenciaPagos)
                  )[0]?.nombre
                }
              </td>
            </tr>
            <tr className="odd:bg-white  even:bg-gray-50  border-b row-span-2">
              <th
                scope="row"
                className="px-4 py-2 font-medium text-sm text-gray-900 whitespace-nowrap "
              >
                Banco
              </th>
              <td className="px-4 py-2">
                {BANCO[Number(values.banco)].nombre}
              </td>
            </tr>
            <tr className="odd:bg-white  even:bg-gray-50  border-b row-span-2">
              <th
                scope="row"
                className="px-4 py-2 font-medium text-sm text-gray-900 whitespace-nowrap "
              >
                Nro Cuenta Bancaria
              </th>
              <td className="px-4 py-2">{values.nroCuenta}</td>
            </tr>
            <tr className="odd:bg-white  even:bg-gray-50  border-b row-span-2">
              <th
                scope="row"
                className="px-4 py-2 font-medium text-sm text-gray-900 whitespace-nowrap "
              >
                Nro Cuenta interbancaria
              </th>
              <td className="px-4 py-2">{values.nroCuentaInterbancario}</td>
            </tr>
            <tr className="odd:bg-white  even:bg-gray-50  border-b row-span-2">
              <th
                scope="row"
                className="px-4 py-2 font-medium text-sm text-gray-900 whitespace-nowrap "
              >
                Dirección
              </th>
              <td className="px-4 py-2">{values.direccion}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* <div className="flex items-center ml-3">
        <input
          id="link-checkbox"
          type="checkbox"
          value=""
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="link-checkbox"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          I agree with the{" "}
          <a
            href="#"
            className="text-blue-600 dark:text-blue-500 hover:underline"
          >
            terms and conditions
          </a>
          .
        </label>
      </div> */}
      {/* <ReCAPTCHA
        sitekey={RECAPTCHA_SITE_KEY}
        onChange={onCaptchaChange}
        className="col-span-12 mb-5 mt-5"
      /> */}

      <div className="w-full flex flex-row justify-between items-center mt-6">
        <button
          type="button"
          onClick={handleConfirmCancel}
          className="text-white bg-gray-400 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  "
        >
          Regresar
        </button>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
        >
          Registrarme
        </button>
      </div>
    </div>
  );
}
