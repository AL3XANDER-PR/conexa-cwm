import SelectInput from "../../shared/FormInputs/SelectInput";
import TextInput from "../../shared/FormInputs/TextInput";
import SelectDirection from "../../shared/FormInputs/SelectDireccion";
import PhoneInput from "../../shared/FormInputs/PhoneInput";
import InputNumber from "../../shared/FormInputs/InputNumber";
import InputWithModal from "../../shared/FormInputs/InputwithModal";

export default function StepDomicilio() {

  return (
    <section className="grid gap-4 gap-y-2 text-sm grid-cols-1 sm:grid-cols-12">
      <h3 className="col-span-12 mt-2 mb-0 font-semibold text-gray-900 ">
        Datos del Domicilio (Todas las comunicaciones y/o notificaciones se
        enviarán a esta dirección).
      </h3>
      <SelectDirection />
      <TextInput
        name="direccion"
        type="text"
        label="Domicilio:"
        className="col-span-12"
      />
      <TextInput
        name="referencia"
        type="text"
        label="Referencia:"
        className="col-span-9"
      />
      <InputWithModal
        name="cod_postal"
        type="text"
        label="Cod. Postal:"
        className="col-span-3"
      />
      <TextInput
        name="email"
        type="email"
        label="Email:"
        className="col-span-12"
      />
      <PhoneInput
        name="celular"
        label="Celular"
        className="col-span-12 sm:col-span-6"
      />

      <TextInput
        name="telefonoDomicilio"
        type="tel"
        label="Telefono:"
        className="col-span-12 sm:col-span-6"
      />

      <h3 className="col-span-12 mt-2 mb-0 font-semibold text-gray-900 ">
        Cuentas Bancarias (Para depósitos de los rendimientos).
      </h3>
      <SelectInput
        label="Tipo de Cuenta"
        name="tipoCuenta"
        className="col-span-12 sm:col-span-6"
        idPadre={908}
        valor
      />
      <SelectInput
        label="Banco"
        name="banco"
        className="col-span-12 sm:col-span-6"
        idPadre={73}
        sort
      />

      <InputNumber
        name="nroCuenta"
        label="Cuenta Bancaria N°:"
        className="col-span-12 sm:col-span-6"
        cantidad="20"
      />
      <InputNumber
        name="nroCuentaInterbancario"
        label="Cuenta Interbancaria N°:"
        className="col-span-12 sm:col-span-6"
        cantidad="20"
      />
    </section>
  );
}
