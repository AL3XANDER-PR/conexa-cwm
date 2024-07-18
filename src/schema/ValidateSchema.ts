// @ts-nocheck
import * as yup from "yup";
import { MONEDA, REGEXP, TIPO_DOCUMENTO } from "../constants/constants";
const defaultErrorMessages = {
  required: "Este campo es obligatorio",
  string: "This field must be a string",
  number: "This field must be a number",
  email: "Invalid email address",
  url: "Invalid URL",
  min: (minValue: string) => `This field must be at least ${minValue}`,
  max: (maxValue: string) => `This field must be at most ${maxValue}`,
  matches: "Invalid format",
  length: (length: string) =>
    `This field must be exactly ${length} characters long`,
  positive: "This field must be a positive number",
  negative: "This field must be a negative number",
  integer: "This field must be an integer",
  date: "Invalid date format",
  array: "This field must be an array",
  minItems: (minItems: string) =>
    `This field must have at least ${minItems} items`,
  maxItems: (maxItems: string) =>
    `This field must have at most ${maxItems} items`,
  unique: "This field must contain only unique values",
  onlyLettersSpaces: "Este campo debe contener sólo letras y espacios",
};

const validacionesParticipe = {
  nombres: yup.string().when("tipoDocumento", {
    is: (val: string) => val === TIPO_DOCUMENTO.DNI,
    then: (schema) =>
      schema
        .required(defaultErrorMessages.required)
        .matches(REGEXP.texto, defaultErrorMessages.onlyLettersSpaces)
        .typeError("Solo Letras y Espacios"),
  }),
  apellidoPaterno: yup.string().when("tipoDocumento", {
    is: (val: string) => val === TIPO_DOCUMENTO.DNI,
    then: (schema) =>
      schema
        .required(defaultErrorMessages.required)
        .matches(REGEXP.texto, defaultErrorMessages.onlyLettersSpaces)
        .typeError("Solo Letras y Espacios"),
  }),
  apellidoMaterno: yup.string().when("tipoDocumento", {
    is: (val: string) => val === TIPO_DOCUMENTO.DNI,
    then: (schema) =>
      schema
        .required(defaultErrorMessages.required)
        .matches(REGEXP.texto, defaultErrorMessages.onlyLettersSpaces)
        .typeError("Solo Letras y Espacios"),
  }),
  fechaNacimiento: yup
    .string()
    .nullable()
    .when("tipoDocumento", {
      is: (val: string) => val === TIPO_DOCUMENTO.DNI,
      then: (schema) => schema.required(defaultErrorMessages.required),
    }),
  lugarNacimiento: yup.string().when("tipoDocumento", {
    is: (val: string) => val === TIPO_DOCUMENTO.DNI,
    then: (schema) =>
      schema
        .required(defaultErrorMessages.required)
        .matches(REGEXP.texto, defaultErrorMessages.onlyLettersSpaces)
        .typeError("Solo Letras y Espacios"),
  }),
  nacionalidad: yup.string().when("tipoDocumento", {
    is: (val: string) => val === TIPO_DOCUMENTO.DNI,
    then: (schema) =>
      schema
        .required(defaultErrorMessages.required)
        .matches(REGEXP.texto, defaultErrorMessages.onlyLettersSpaces)
        .typeError("Solo Letras y Espacios"),
  }),
  estadoCivil: yup
    .string()
    .when("tipoDocumento", {
      is: (val: string) => val === TIPO_DOCUMENTO.DNI,
      then: (schema) => schema.required(defaultErrorMessages.required),
    })
    .typeError("Solo Letras y Espacios"),
  id_genero: yup
    .string()
    .when("tipoDocumento", {
      is: (val: string) => val === TIPO_DOCUMENTO.DNI,
      then: (schema) => schema.required(defaultErrorMessages.required),
    })
    .typeError("Solo Letras y Espacios"),
  situacionLaboral: yup
    .string()
    .when("tipoDocumento", {
      is: (val: string) => val === TIPO_DOCUMENTO.DNI,
      then: (schema) => schema.required(defaultErrorMessages.required),
    })
    .typeError("Solo Letras y Espacios"),
  profesion: yup.string().when("tipoDocumento", {
    is: (val: string) => val === TIPO_DOCUMENTO.DNI,
    then: (schema) =>
      schema
        .required(defaultErrorMessages.required)
        .matches(REGEXP.texto, defaultErrorMessages.onlyLettersSpaces)
        .typeError("Solo Letras y Espacios"),
  }),
  centro_labores: yup.string().when("tipoDocumento", {
    is: (val: string) => val === TIPO_DOCUMENTO.DNI,
    then: (schema) =>
      schema
        .required(defaultErrorMessages.required)
        .matches(REGEXP.texto, defaultErrorMessages.onlyLettersSpaces)
        .typeError("Solo Letras y Espacios"),
  }),
  cargo: yup.string().when("tipoDocumento", {
    is: (val: string) => val === TIPO_DOCUMENTO.DNI,
    then: (schema) =>
      schema
        .required(defaultErrorMessages.required)
        .matches(REGEXP.texto, defaultErrorMessages.onlyLettersSpaces)
        .typeError("Solo Letras y Espacios"),
  }),
  antiguedad_anios: yup.string().when("tipoDocumento", {
    is: (val: string) => val === TIPO_DOCUMENTO.DNI,
    then: (schema) =>
      schema
        .required(defaultErrorMessages.required)
        // .matches(REGEXP.texto, defaultErrorMessages.onlyLettersSpaces)
        .typeError("Solo Letras y Espacios"),
  }),
};

const validacionesTipoRuc = {
  razonSocial: yup.string().when("tipoDocumento", {
    is: (val: string) => val === TIPO_DOCUMENTO.RUC,
    then: (schema) =>
      schema
        .required(defaultErrorMessages.required)
        .matches(REGEXP.texto, defaultErrorMessages.onlyLettersSpaces)
        .typeError("Solo Letras y Espacios"),
  }),

  objetoSocial: yup.string().when("tipoDocumento", {
    is: (val: string) => val === TIPO_DOCUMENTO.RUC,
    then: (schema) =>
      schema
        .required(defaultErrorMessages.required)
        .matches(REGEXP.texto, defaultErrorMessages.onlyLettersSpaces)
        .typeError("Solo Letras y Espacios"),
  }),

  fechaInicioOperaciones: yup
    .string()
    .nullable()
    .when("tipoDocumento", {
      is: (val: string) => val === TIPO_DOCUMENTO.RUC,
      then: (schema) => schema.required(defaultErrorMessages.required),
    }),
  lugarRegistro: yup.string().when("tipoDocumento", {
    is: (val: string) => val === TIPO_DOCUMENTO.RUC,
    then: (schema) =>
      schema
        .required(defaultErrorMessages.required)
        .matches(REGEXP.texto, defaultErrorMessages.onlyLettersSpaces)
        .typeError("Solo Letras y Espacios"),
  }),
  estadoContribuyenteSunat: yup.string().when("tipoDocumento", {
    is: (val: string) => val === TIPO_DOCUMENTO.RUC,
    then: (schema) =>
      schema
        .required(defaultErrorMessages.required)
        .matches(/^[A-Za-z\s]+$/, defaultErrorMessages.onlyLettersSpaces)
        .typeError("Solo Letras y Espacios"),
  }),
  pais: yup.string().when("tipoDocumento", {
    is: (val: string) => val === TIPO_DOCUMENTO.RUC,
    then: (schema) =>
      schema
        .required(defaultErrorMessages.required)
        .matches(REGEXP.letrasEspacios, defaultErrorMessages.onlyLettersSpaces)
        .typeError("Solo Letras y Espacios"),
  }),
};

// const step1 = yup.object({
//   tipoPersona: yup.string().required(defaultErrorMessages.required),
//   tipoDocumento: yup.string().required(defaultErrorMessages.required),
//   nroDocumento: yup
//     .string()
//     // .transform((value) => (value === "" ? undefined : value))
//     .required(defaultErrorMessages.required)
//     .when("tipoDocumento", {
//       is: (val: string) => val === TIPO_DOCUMENTO.DNI,
//       then: (schema) =>
//         schema
//           .min(8, "El Nro DNI debe tener 8 dígitos.")
//           .max(8, "El Nro DNI debe tener 8 dígitos."),
//       // otherwise: yup.string().required('El tipo de documento no es válido'),
//     })
//     .when("tipoDocumento", {
//       is: (val: string) => val === TIPO_DOCUMENTO.RUC,
//       then: (schema) =>
//         schema
//           .min(11, "El Nro RUC debe tener 11 dígitos.")
//           .max(11, "El Nro RUC debe tener 11 dígitos."),
//       // otherwise: yup.string().required('El tipo de documento no es válido'),
//     }),
//   // .typeError("Solo Numeros"),
//   ...validacionesParticipe,
//   ...validacionesTipoRuc,
// });
// const step2 = yup.object().shape({
//   tipoParticipe: yup.string().required(defaultErrorMessages.required),
//   // tipoInversionista: yup.string().required(defaultErrorMessages.required),
//   monedaInversion: yup.string().required(defaultErrorMessages.required),
//   djImporte: yup
//     .string()
//     .required(defaultErrorMessages.required)
//     .transform((val) => val?.replace(/[^0-9]/g, ""))
//     .when("monedaInversion", {
//       is: (val: string) => val === MONEDA.PEN,
//       then: (schema) =>
//         // schema.min(100000, "El monto minimo de inversion es de S/. 100,000"),
//         schema
//           // .test("is-valid-number", "Amount must be a valid number", (value) => {
//           //   return !isNaN(Number(value));
//           // })
//           .test(
//             "is-min-amount",
//             `El monto minimo de inversion es de S/. 100,000`,
//             (value) => {
//               return Number(value) >= 100000;
//             }
//           ),
//       // otherwise: yup.string().required('El tipo de documento no es válido'),
//     })
//     .when("monedaInversion", {
//       is: (val: string) => val === MONEDA.USD,
//       then: (schema) =>
//         schema
//           // .test("is-valid-number", "Amount must be a valid number", (value) => {
//           //   return !isNaN(Number(value));
//           // })
//           .test(
//             "is-min-amount",
//             `El monto minimo de inversion es de $ 30,000`,
//             (value) => {
//               return Number(value) >= 30000;
//             }
//           ),
//       // otherwise: yup.string().required('El tipo de documento no es válido'),
//     }),
//   modalidadInversion: yup.string().required(defaultErrorMessages.required),
//   tiempoInversion: yup.string().required(defaultErrorMessages.required),
//   frecuenciaPagos: yup.string().required(defaultErrorMessages.required),
// });
// const step3 = yup.object().shape({
//   dir_pais: yup.string().required(defaultErrorMessages.required),
//   dir_departamento: yup.string().required(defaultErrorMessages.required),
//   dir_provincia: yup.string().required(defaultErrorMessages.required),
//   dir_distrito: yup.string().required(defaultErrorMessages.required),
//   direccion: yup.string().required(defaultErrorMessages.required),
//   referencia: yup.string().required(defaultErrorMessages.required),
//   email: yup
//     .string()
//     .email("Ingrese un email valido: example@example.com")
//     .required(defaultErrorMessages.required),
//   telefonoDomicilio: yup.string().required(defaultErrorMessages.required),
//   celular: yup.string().required(defaultErrorMessages.required),
//   tipoCuenta: yup.string().required(defaultErrorMessages.required),
//   banco: yup.string().required(defaultErrorMessages.required),
//   nroCuenta: yup.string().required(defaultErrorMessages.required),
//   nroCuentaInterbancario: yup.string().required(defaultErrorMessages.required),
// });
// const step4 = yup.object().shape({
//   id_tipo_vinculacion: yup.string().when("vinculacion", {
//     is: (val: boolean) => val,
//     then: (schema) => schema.required(defaultErrorMessages.required),
//   }),
//   nombre_pariente: yup.string().when("vinculacion", {
//     is: (val: boolean) => val,
//     then: (schema) =>
//       schema
//         .required(defaultErrorMessages.required)
//         .matches(/^[A-Za-z\s]+$/, defaultErrorMessages.onlyLettersSpaces)
//         .typeError("Solo Letras y Espacios"),
//   }),
//   nro_documento_pariente: yup.string().when("vinculacion", {
//     is: (val: boolean) => val,
//     then: (schema) => schema.required(defaultErrorMessages.required),
//   }),
// });
// const step5 = yup.object().shape({
//   djPais: yup.string().required(defaultErrorMessages.required),
//   proviene: yup
//     .object()
//     .test(
//       "at-least-one-true",
//       "At least one checkbox must be selected",
//       (value) => Object.values(value).some((val) => val === true)
//     ),
// });
// const step6 = yup.object().shape({
//   cargo_ppe: yup.string().when("relacion_ppe", {
//     is: (val: boolean) => val,
//     then: (schema) =>
//       schema
//         .required(defaultErrorMessages.required)
//         .matches(/^[A-Za-z\s]+$/, defaultErrorMessages.onlyLettersSpaces)
//         .typeError("Solo Letras y Espacios"),
//   }),
//   institucion_ppe: yup.string().when("relacion_ppe", {
//     is: (val: boolean) => val,
//     then: (schema) =>
//       schema
//         .required(defaultErrorMessages.required)
//         .matches(/^[A-Za-z\s]+$/, defaultErrorMessages.onlyLettersSpaces)
//         .typeError("Solo Letras y Espacios"),
//   }),
//   nombre_ppe: yup.string().when("en_actividad_ppe", {
//     is: (val: boolean) => val,
//     then: (schema) =>
//       schema
//         .required(defaultErrorMessages.required)
//         .matches(/^[A-Za-z\s]+$/, defaultErrorMessages.onlyLettersSpaces)
//         .typeError("Solo Letras y Espacios"),
//   }),
//   parentesco_ppe: yup.string().when("en_actividad_ppe", {
//     is: (val: boolean) => val,
//     then: (schema) =>
//       schema
//         .required(defaultErrorMessages.required)
//         .matches(/^[A-Za-z\s]+$/, defaultErrorMessages.onlyLettersSpaces)
//         .typeError("Solo Letras y Espacios"),
//   }),
// });

const step1 = yup.object({});
const step2 = yup.object({});
const step3 = yup.object({});
const step4 = yup.object({});
const step5 = yup.object({});
const step6 = yup.object({});

export const validationSchema = [step1, step2, step3, step4, step5, step6];
