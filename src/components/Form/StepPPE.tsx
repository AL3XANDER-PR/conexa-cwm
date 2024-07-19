import { useFormikContext } from "formik";
import TextInput from "../../shared/FormInputs/TextInput";
import { FormDataValues } from "../../interfaces/FormInterface";

export default function StepPPE() {
  const { getFieldProps, values } = useFormikContext<FormDataValues>();
  return (
    <section className="grid gap-4 gap-y-2 text-sm grid-cols-1 sm:grid-cols-12">
      <h3 className="col-span-12 mt-2 mb-0 font-semibold text-gray-900 text-sm ">
        ¿Soy y/o tengo relación directa con una Persona Políticamente
        Expuesta[*]? Incluye a personas naturales hasta segundo grado de
        consanguinidad y afinidad, el cónyuge y concubino.
      </h3>

      <div className="col-span-12 sm:col-span-6 flex  mt-0  ">
        <div className="relative">
          <label className="inline-flex cursor-pointer flex-row">
            <input
              type="checkbox"
              className="sr-only peer"
              {...getFieldProps("relacion_ppe")}
              checked={values.relacion_ppe === true}
            />
            <span className="mr-2 w-4">
              {values.relacion_ppe ? "Si" : "No"}
            </span>
            <div className=" relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
      <>
        {values.relacion_ppe && (
          <>
            <h3 className="col-span-12 mt-2 mb-0 font-semibold text-gray-900 ">
              En caso sea afirmativo indicar:
            </h3>
            <TextInput
              name="institucion_ppe"
              type="text"
              label="Institución"
              className="col-span-12 sm:col-span-6"
            />
            <TextInput
              name="cargo_ppe"
              type="text"
              label="Cargo"
              className="col-span-12 sm:col-span-6"
            />
            <h3 className="col-span-12 mt-2 mb-0 font-semibold text-gray-900 ">
              ¿Está en actividad?
            </h3>
            <div className="col-span-12 sm:col-span-2 flex  mt-2 mb-4 ">
              <div className="relative">
                <label className="inline-flex cursor-pointer flex-row">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    {...getFieldProps("en_actividad_ppe")}
                    checked={values.en_actividad_ppe === true}
                  />
                  <span className="mr-2 w-4">
                    {values.en_actividad_ppe ? "Si" : "No"}
                  </span>
                  <div className=" relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            {values.en_actividad_ppe && (
              <>
                <TextInput
                  name="nombre_ppe"
                  type="text"
                  label="Nombre:"
                  className="col-span-12 sm:col-span-5"
                />
                <TextInput
                  name="parentesco_ppe"
                  type="text"
                  label="Parentesco"
                  className="col-span-12 sm:col-span-5"
                />
              </>
            )}
          </>
        )}
      </>

      {/* <ReCAPTCHA
        sitekey={RECAPTCHA_SITE_KEY}
        onChange={onCaptchaChange}
        className="col-span-12 mb-5 mt-5"
      /> */}
      <p
        id="helper-text-explanation"
        className="mt-0 text-xs text-gray-500  col-span-12"
      >
        * Persona Políticamente Expuesta : Aquellas personas naturales que
        cumplen o hayan cumplido funciones públicas destacadas en los últimos
        (5) años, sea en territorio nacional o extranjero y cuyas circunstancias
        financieras puedan ser objeto de interés público. Aplica para
        accionistas con más del 10% de participación.
      </p>
    </section>
  );
}
