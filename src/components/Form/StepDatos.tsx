import { useFormikContext } from "formik";
import SelectInput from "../../shared/FormInputs/SelectInput";
import { FormDataValues } from "../../interfaces/FormInterface";
import {
  ESTADO_CIVIL,
  SEXO,
  TD_MASK,
  TIPO_DOCUMENTO,
  TIPO_PERSONA,
} from "../../constants/constants";
import TextInput from "../../shared/FormInputs/TextInput";
import InputSearch from "../../shared/FormInputs/InputSearch";
import { IconCompany, IconPerson } from "../../assets/icons/Icons";
import { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getInfoByDocument } from "../../services/getDocumentService";
const MySwal = withReactContent(Swal);

export default function StepDatos() {
  const {
    setFieldTouched,
    setFieldError,
    setValues,
    touched,
    errors,
    getFieldProps,
    values,
    setFieldValue,
  } = useFormikContext<FormDataValues>();

  const handleSearch = async () => {
    setFieldTouched("nroDocumento", true);
    setFieldTouched("tipoDocumento", true);
    if (!values.tipoDocumento) {
      setFieldError("tipoDocumento", "");
      return;
    }

    if (!values.nroDocumento) {
      setFieldError("nroDocumento", "");
      return;
    }

    try {
      const params = {
        tipo: values.tipoDocumento,
        numero: values.nroDocumento,
      };
      const res = await getInfoByDocument({ ...params });

      if (res === "") {
        MySwal.fire({
          title: "Error",
          text: `No se encontro a la persona con DNI: ${values.nroDocumento}`,
          icon: "error",
          customClass: {
            popup: " text-sm",
          },
        });
      } else {
        if (values.tipoDocumento === TIPO_DOCUMENTO.DNI) {
          setValues({
            ...values,
            nombres: res.nombres,
            apellidoPaterno: res.apellidoPaterno,
            apellidoMaterno: res.apellidoMaterno,
            nroDocumento: res.numeroDocumento,
          });
        }

        if (values.tipoDocumento === TIPO_DOCUMENTO.RUC) {
          setValues({
            ...values,
            razonSocial: res.razonSocial,
            objetoSocial: res.actividadEconomica,
            estadoContribuyenteSunat: res.condicion,
            lugarRegistro: res.direccion,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearchConyuge = async () => {
    setFieldTouched("tipoDocumentoConyuge", true);
    setFieldTouched("nroDocumentoConyuge", true);
    if (!values.tipoDocumentoConyuge) {
      setFieldError("tipoDocumentoConyuge", "");
      return;
    }

    if (!values.nroDocumentoConyuge) {
      setFieldError("nroDocumentoConyuge", "");
      return;
    }

    try {
      const params = {
        tipo: values.tipoDocumentoConyuge,
        numero: values.nroDocumentoConyuge,
      };
      const res = await getInfoByDocument({ ...params });
      if (values.tipoDocumento === TIPO_DOCUMENTO.DNI) {
        setValues({
          ...values,
          nombresConyuge: res.nombres,
          apellidoPaternoConyuge: res.apellidoPaterno,
          apellidoMaternoConyuge: res.apellidoMaterno,
          // nroDocumento: res.numeroDocumento,
        });
      }

      // setFieldValue("razonSocial", "John Doe");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // document.querySelectorAll("input").forEach((item) => {
    //   if (item.name === "tipoPersona") return;
    //   if (item.type === "checkbox") return setFieldValue(item.name, false);
    //   setFieldValue(item.name, "");
    // });

    if (values.tipoPersona === "") {
      setFieldValue("tipoPersona", TIPO_PERSONA.NATURAL);
    }

    if (values.tipoPersona === TIPO_PERSONA.NATURAL) {
      setFieldValue("tipoDocumento", TIPO_DOCUMENTO.DNI);
    }

    if (values.tipoPersona === TIPO_PERSONA.JURIDICO) {
      setFieldValue("tipoDocumento", TIPO_DOCUMENTO.RUC);
    }
  }, [values.tipoPersona]);

  return (
    <section className="grid gap-4 gap-y-2 text-sm grid-cols-12 sm:grid-cols-12">
      <ul className="col-span-12 grid w-full gap-1 lg:gap-6 grid-cols-2 xl:grid-cols-2">
        <li>
          <input
            type="radio"
            id="personaNatural"
            {...getFieldProps("tipoPersona")}
            value={TIPO_PERSONA.NATURAL}
            className="hidden peer"
            checked={values.tipoPersona === TIPO_PERSONA.NATURAL}
          />
          <label
            htmlFor="personaNatural"
            className="inline-flex items-center justify-between w-full px-2 lg:px-5 py-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer  peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 peer-checked:bg-blue-100"
          >
            <div className="flex flex-row gap-4 w-full">
              <div className="h-9 w-9 rounded-full border flex items-center justify-center">
                <IconPerson />
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="font-semibold ">Persona Natural</h4>
                <p className=" text-sm hidden xl:block">
                  Individuo con obligaciones tributarias.
                </p>
              </div>
            </div>
          </label>
        </li>
        <li>
          <input
            type="radio"
            id="personaJuridica"
            {...getFieldProps("tipoPersona")}
            value={TIPO_PERSONA.JURIDICO}
            className="hidden peer"
            checked={values.tipoPersona === TIPO_PERSONA.JURIDICO}
          />
          <label
            htmlFor="personaJuridica"
            className="inline-flex items-center justify-between w-full px-2 lg:px-5 py-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer  peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 peer-checked:bg-blue-200"
          >
            <div className="flex flex-row gap-4 w-full">
              <div className="h-9 w-9 rounded-full border flex items-center justify-center">
                <IconCompany />
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="font-semibold">Persona Juridica</h4>
                <p className=" text-sm hidden xl:block">
                  Entidad empresarial con obligaciones fiscales.
                </p>
              </div>
            </div>
          </label>
        </li>
      </ul>
      <>
        {errors.tipoPersona && touched.tipoPersona && (
          <p className="col-span-12 mt-0.5 text-xs text-red-600 dark:text-red-400">
            {errors.tipoPersona}
          </p>
        )}
      </>
      <SelectInput
        name="tipoDocumento"
        label="Tipo Documento:"
        className="col-span-12 sm:col-span-3"
        idPadre={7}
        abvr
        disabled={values.tipoPersona === TIPO_PERSONA.JURIDICO}
      />
      <InputSearch
        name="nroDocumento"
        label="Numero Documento:"
        className="col-span-12 sm:col-span-9"
        hidden={
          !(
            values.tipoDocumento !== TIPO_DOCUMENTO.RUC &&
            values.tipoDocumento !== TIPO_DOCUMENTO.DNI
          )
        }
        handleSearch={handleSearch}
        mt
        cantidad={
          values.tipoDocumento !== ""
            ? TD_MASK[Number(values.tipoDocumento)].digitos
            : "20"
        }
      />
      <>
        {values.tipoPersona === TIPO_PERSONA.NATURAL && (
          <>
            <TextInput
              name="nombres"
              type="text"
              label="Nombres"
              className="col-span-12 lg:col-span-4"
            />
            <TextInput
              name="apellidoPaterno"
              type="text"
              label="Apellido Paterno"
              className="col-span-6 lg:col-span-4"
            />
            <TextInput
              name="apellidoMaterno"
              type="text"
              label="Apellido Materno"
              className="col-span-6 lg:col-span-4"
            />
            <TextInput
              name="fechaNacimiento"
              type="date"
              label="Fecha Nacimiento"
              className="col-span-12 lg:col-span-3"
            />
            <TextInput
              name="lugarNacimiento"
              type="text"
              label="Lugar Nacimiento"
              className="col-span-12 lg:col-span-3"
            />
            <SelectInput
              textDefault="Estado Civil"
              name="estadoCivil"
              className="col-span-6 lg:col-span-3"
              idPadre={13}
            />
            <TextInput
              name="nacionalidad"
              type="text"
              label="Nacionalidad"
              className="col-span-6 lg:col-span-3"
            />

            <div className="col-span-12 lg:col-span-6 flex flex-col ">
              <span
                data-tooltip-target="tooltip-default"
                className="text-xs font-medium text-gray-900 flex items-center "
              >
                Genero
              </span>
              <div className="flex gap-3 w-full">
                <div className=" flex items-center ps-4 border border-gray-200 rounded-lg w-full">
                  <input
                    id="sexoM"
                    type="radio"
                    {...getFieldProps("id_genero")}
                    value={SEXO.M}
                    checked={values.id_genero === SEXO.M}
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2 "
                  />
                  <label
                    htmlFor="sexoM"
                    className="w-full py-2 ms-2 text-sm font-medium text-gray-900 "
                  >
                    Masculino
                  </label>
                </div>
                <div className=" flex items-center ps-4 border border-gray-200 rounded-lg w-full">
                  <input
                    id="sexoF"
                    type="radio"
                    {...getFieldProps("id_genero")}
                    value={SEXO.F}
                    checked={values.id_genero === SEXO.F}
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2 "
                  />
                  <label
                    htmlFor="sexoF"
                    className="w-full py-2 ms-2 text-sm font-medium text-gray-900 "
                  >
                    Femenino
                  </label>
                </div>
              </div>
            </div>
            <>
              {errors.id_genero && touched.id_genero && (
                <p className="col-span-12 mt-0.5 text-xs text-red-600 dark:text-red-400">
                  {errors.id_genero}
                </p>
              )}
            </>

            {values.estadoCivil === ESTADO_CIVIL.C && (
              <>
                <hr className="h-px my-4 col-span-12 bg-gray-200 border-0 d"></hr>
                <h3 className="col-span-12 mb-0 font-semibold text-gray-900 ">
                  Datos del Cónyuge:
                </h3>
                <SelectInput
                  textDefault="---"
                  label="Tipo Documento Conyuge"
                  name="tipoDocumentoConyuge"
                  className="col-span-12 lg:col-span-4"
                  idPadre={7}
                  abvr
                  ids={[9, 10, 11, 12]}
                />
                <InputSearch
                  name="nroDocumentoConyuge"
                  label="Numero Documento Conyuge:"
                  className="col-span-12 sm:col-span-8"
                  hidden={!(values.tipoDocumentoConyuge !== TIPO_DOCUMENTO.DNI)}
                  handleSearch={handleSearchConyuge}
                  mt
                />
                <TextInput
                  name="nombresConyuge"
                  type="text"
                  label="Nombres"
                  className="col-span-12 lg:col-span-4"
                />
                <TextInput
                  name="apellidoPaternoConyuge"
                  type="text"
                  label="Apellido Paterno"
                  className="col-span-12 lg:col-span-4"
                />
                <TextInput
                  name="apellidoMaternoConyuge"
                  type="text"
                  label="Apellido Materno"
                  className="col-span-12 lg:col-span-4"
                />
                <SelectInput
                  label="Regimen Patrimonial"
                  name="regimenPatrimonialConyuge"
                  className="col-span-6"
                  options={[
                    {
                      id_catalogo: 1,
                      nombre: "Sociedad Gananciales",
                    },
                    {
                      id_catalogo: 2,
                      nombre: "Separación de Patrimonios",
                    },
                  ]}
                />
                <TextInput
                  name="nroPartida"
                  type="text"
                  label="Numero Partida:"
                  className="col-span-6"
                  mt
                />
                {/* <hr className="h-px my-4 col-span-12 bg-gray-200 border-0 d"></hr> */}
              </>
            )}
            <hr className="h-px my-4 col-span-12 bg-gray-200 border-0 d"></hr>
            <h3 className="col-span-12 mb-0 font-semibold text-gray-900 ">
              Datos Laborales Inversionista:
            </h3>

            <SelectInput
              textDefault="Situacion Laboral"
              name="situacionLaboral"
              className="col-span-12 lg:col-span-4"
              options={[
                {
                  id_catalogo: 1,
                  nombre: "Trabajador Independiente",
                },
                {
                  id_catalogo: 2,
                  nombre: "Trabajador Dependiente",
                },
                {
                  id_catalogo: 3,
                  nombre: "Otros",
                },
              ]}
            />
            <TextInput
              name="profesion"
              type="text"
              label="Profesion u Ocupación:"
              className="col-span-12 lg:col-span-8"
            />
            <TextInput
              name="centro_labores"
              type="text"
              label="Centro de Labores:"
              className="col-span-12 lg:col-span-4"
            />
            <TextInput
              name="cargo"
              type="text"
              label="Cargo:"
              className="col-span-7 lg:col-span-4"
            />
            <TextInput
              name="antiguedad_anios"
              type="number"
              label="Antiguedad Años"
              className="col-span-5 lg:col-span-4"
            />
          </>
        )}
      </>

      <>
        {values.tipoPersona === TIPO_PERSONA.JURIDICO && (
          <>
            <TextInput
              name="razonSocial"
              type="text"
              label="Razon Social"
              className="col-span-12"
            />
            <TextInput
              name="objetoSocial"
              type="text"
              label="Objeto Social"
              className="col-span-12"
            />
            <TextInput
              name="fechaInicioOperaciones"
              type="date"
              label="Fecha Inicio Operaciones:"
              className="col-span-12 sm:col-span-6"
            />
            <TextInput
              name="lugarRegistro"
              type="text"
              label="Lugar de Registro:"
              className="col-span-12 sm:col-span-6"
            />
            <TextInput
              name="estadoContribuyenteSunat"
              type="text"
              label="Estado SUNAT:"
              className="col-span-6 sm:col-span-8"
            />
            <TextInput
              name="pais"
              type="text"
              label="País:"
              className="col-span-6 sm:col-span-4"
            />
          </>
        )}
      </>

      <div className="col-span-12 sm:col-span-6  flex mt-2 ">
        <div className="relative">
          <label className="inline-flex cursor-pointer flex-col">
            <span
              data-tooltip-target="tooltip-default"
              className="text-base font-medium text-gray-900 flex items-center "
            >
              Domiciliado
            </span>

            <input
              type="checkbox"
              className="sr-only peer"
              {...getFieldProps("domiciliado")}
              checked={values.domiciliado === true}
            />

            <div className=" relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
      <p
        id="helper-text-explanation"
        className="mt-0 text-xs text-gray-500  col-span-12"
      >
        * Domiciliado: (i) Se considera Persona Juridica Domiciliada cuando se
        constituye dentro del territorio Peruano, (Ji) Se considera Persona
        Juridica No Domiciliada cuando se constituye fuera del territorio
        Peruano. Ver art. P del D. S. NP 179-2004-EF.
      </p>
    </section>
  );
}
