import { useFormikContext } from "formik";
import { FormDataValues } from "../../interfaces/FormInterface";
import SelectInput from "../../shared/FormInputs/SelectInput";
import InputSearchVinculacion from "../../shared/FormInputs/InputSearchVinculacion";
import { TIPO_DOCUMENTO } from "../../constants/constants";
import TextInput from "../../shared/FormInputs/TextInput";
import { getInfoByDocument } from "../../services/getDocumentService";

export default function StepVinculacion() {
  const {
    setFieldValue,
    setFieldTouched,
    setFieldError,
    getFieldProps,
    values,
  } = useFormikContext<FormDataValues>();

  const handleSearch = async () => {
    setFieldTouched("nro_documento_pariente", true);

    if (!values.nro_documento_pariente) {
      setFieldError("nro_documento_pariente", "");
      return;
    }

    try {
      const params = {
        tipo: TIPO_DOCUMENTO.DNI,
        numero: values.nro_documento_pariente,
      };
      const res = await getInfoByDocument({ ...params });

      const pariente = [
        res.nombres,
        res.apellidoPaterno,
        res.apellidoMaterno,
      ].join(" ");

      setFieldValue("nombre_pariente", pariente);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="grid gap-4 gap-y-2 text-sm grid-cols-1 sm:grid-cols-12">
      <h3 className="col-span-12 mt-2 mb-0 font-semibold text-gray-900 ">
        Tiene Vinculación
      </h3>
      <div className="col-span-12 sm:col-span-6  flex mt-0 ">
        <div className="relative">
          <label className="inline-flex cursor-pointer flex-col">
            <input
              type="checkbox"
              className="sr-only peer"
              {...getFieldProps("vinculacion")}
              checked={values.vinculacion === true}
            />

            <div className=" relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      <hr className="col-span-12 opacity-0" />
      <h3 className="col-span-12 text-xs font-semibold">Vinculación Laboral</h3>
      <SelectInput
        name="id_tipo_vinculacion"
        className="col-span-12 lg:col-span-6"
        options={[
          {
            id_catalogo: 1,
            nombre: "Trabajador",
          },
          {
            id_catalogo: 2,
            nombre: "Directivo",
          },
          {
            id_catalogo: 3,
            nombre: "Pariente de Trabajador o Directivo",
          },
        ]}
        disabled={values.vinculacion === false}
      />
      <hr className="col-span-12 opacity-0" />
      <InputSearchVinculacion
        label="DNI"
        name="nro_documento_pariente"
        type="search"
        className="col-span-12 lg:col-span-6"
        hidden={true}
        handleSearch={handleSearch}
        disabled={values.vinculacion === false}
      />

      <hr className="col-span-12 opacity-0 p-0 m-0" />

      <TextInput
        name="nombre_pariente"
        type="text"
        label="Pariente de Trabajador o Directivo"
        className="col-span-12 lg:col-span-6"
        disabled={values.vinculacion === false}
      />
    </section>
  );
}
