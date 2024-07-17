export interface FormDataValues {
  tipoPersona: string;
  tipoInversionista: string;

  // step2
  monedaInversion: string;
  modalidadInversion: string;
  tiempoInversion: string;
  frecuenciaPagos: string;
  plazoMenes: string;
  nombreAsesor: string;
  nroDocumentoAsesor: string;

  // step3
  // natural
  tipoDocumento: string;
  nroDocumento: number | string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  fechaNacimiento: string;
  lugarNacimiento: string;
  estadoCivil: string;
  nacionalidad: string;
  domiciliado: boolean;
  id_genero: string;
  // juridico
  razonSocial: string;
  objetoSocial: string;
  fechaInicioOperaciones: string;
  lugarRegistro: string;
  estadoContribuyenteSunat: string;
  pais: string;

  // step4
  // natural
  domicilio: string;
  email: string;
  telefonoDomicilio: string;
  celular: string;
  // juridico
  // domicilioFiscal: string;
  // emailEmpresa: string;
  // celularEmpresa: string;
  // centralTelefonica: string;
  // anexoEmpresa: string;

  // step5
  tipoCuenta: string;
  banco: string;
  nroCuenta: string;
  nroCuentaInterbancario: string;

  // step6
  djMoneda: string;
  djImporte: string;
  djPais: string;

  // datos si es RUC

  situacionLaboral: string;
  profesion: string;
  centro_labores: string;
  cargo: string;
  antiguedad_anios: string;

  nombresConyuge: string;
  apellidoPaternoConyuge: string;
  apellidoMaternoConyuge: string;
  tipoDocumentoConyuge: string;
  nroDocumentoConyuge: string;
  regimenPatrimonialConyuge: string;
  nroPartida: string;

  nombresMancomunado: string;
  tipoDocimentoMancomunado: string;
  nroDocumentoMancomunado: string;
  tipoMancomunidad: string;
  parentescoMancomunado: string;
  porcentajeParticipacionMancomunado: string;
  tipoCuentaMancomunado: string;
  bancoMancomunado: string;
  cuentaBancariaMancomunado: string;
  cuentaInterbancariaMancomunado: string;

  vinculacion: boolean;
  relacion_ppe: boolean;
  en_actividad_ppe: boolean;
  id_tipo_vinculacion: string;
  nombre_pariente: string;
  nro_documento_pariente: string;

  trabajadorDirectivo: string;
  parienteTrabajadorDirectivo: string;
  AsesorFinanciero: string;
  dniAsesor: string;

  institucion_ppe: string;
  cargo_ppe: string;
  nombre_ppe: string;
  parentesco_ppe: string;
  tipoParticipe: string;
  fech: string;

  dir_pais: string;
  dir_departamento: string;
  dir_provincia: string;
  dir_distrito: string;

  direccion: string;
  referencia: string;
  images: File[];
  pdf: object;
  proviene: { [key: string]: boolean };
  cbx_otros: boolean;
  txt_otros: string;
  cod_postal: string;
}

export const initialValues = {
  cargo_ppe: "",
  institucion_ppe: "",
  nombre_ppe: "",
  parentesco_ppe: "",
  tipoParticipe: "",
  modalidadInversion: "1",

  tipoInversionista: "",
  // step1
  tipoPersona: "",
  // step2
  monedaInversion: "",
  tiempoInversion: "",
  frecuenciaPagos: "",
  plazoMenes: "",
  nombreAsesor: "",
  nroDocumentoAsesor: "",

  tipoDocumento: "",
  nroDocumento: "",
  nombres: "",
  apellidoPaterno: "",
  apellidoMaterno: "",
  fechaNacimiento: "",
  lugarNacimiento: "",
  estadoCivil: "",
  nacionalidad: "",
  domiciliado: false,

  vinculacion: false,
  relacion_ppe: false,
  en_actividad_ppe: false,
  id_tipo_vinculacion: "",
  nombre_pariente: "",
  nro_documento_pariente: "",

  id_genero: "",

  djMoneda: "",
  djImporte: "",
  djPais: "",

  // juridico
  razonSocial: "",
  objetoSocial: "",
  fechaInicioOperaciones: "",
  lugarRegistro: "",
  estadoContribuyenteSunat: "",
  pais: "",

  domicilio: "",
  email: "",
  telefonoDomicilio: "",
  celular: "",
  // datos si es RUC

  situacionLaboral: "",
  profesion: "",
  centro_labores: "",
  cargo: "",
  antiguedad_anios: "",

  nombresConyuge: "",
  apellidoPaternoConyuge: "",
  apellidoMaternoConyuge: "",
  tipoDocumentoConyuge: "",
  nroDocumentoConyuge: "",
  regimenPatrimonialConyuge: "",
  nroPartida: "",

  tipoCuenta: "",
  banco: "",
  nroCuenta: "",
  nroCuentaInterbancario: "",

  nombresMancomunado: "",
  tipoDocimentoMancomunado: "",
  nroDocumentoMancomunado: "",
  tipoMancomunidad: "",
  parentescoMancomunado: "",
  porcentajeParticipacionMancomunado: "",
  tipoCuentaMancomunado: "",
  bancoMancomunado: "",
  cuentaBancariaMancomunado: "",
  cuentaInterbancariaMancomunado: "",

  trabajadorDirectivo: "",
  parienteTrabajadorDirectivo: "",
  AsesorFinanciero: "",
  dniAsesor: "",
  fech: "",

  dir_pais: "",
  dir_departamento: "",
  dir_provincia: "",
  dir_distrito: "",

  direccion: "",
  referencia: "",
  images: [],
  pdf: {},
  proviene: {},
  cbx_otros: false,
  txt_otros: '',
  cod_postal: '',
};
