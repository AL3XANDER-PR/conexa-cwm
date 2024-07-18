export const API_BASE_URL =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_API_DEV
    : import.meta.env.VITE_API_PRO;

export const TIPO_DOCUMENTO = {
  RUC: "8",
  DNI: "9",
  CE: "10",
  PSS: "11",
  CDI: "12",
};

export const TIPO_PERSONA = {
  NATURAL: "2",
  JURIDICO: "3",
};
export const MONEDA = {
  PEN: "1",
  USD: "2",
};

export const SEXO = {
  M: "1",
  F: "2",
};

export const TIPO_PARTICIPE = {
  A: "559",
  B: "904",
};

export const SITUACION_LABORAL = {
  INDEPENDIENTE: "1",
  DEPENDIENTE: "2",
  OTROS: "3",
};

export const ESTADO_CIVIL = {
  N: "14",
  S: "15",
  C: "16",
  V: "17",
  D: "18",
};

export const REGEXP = {
  texto: /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s.,-]+$/,
  letrasEspacios: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
};

interface DocumentType {
  nombre: string;
  digitos: string;
}
export const TD_MASK: { [key: number]: DocumentType } = {
  8: {
    nombre: "RUC",
    digitos: "11",
  },
  9: { nombre: "DNI", digitos: "8" },

  10: { nombre: "CE", digitos: "12" },
  11: { nombre: "PSS", digitos: "12" },
  12: { nombre: "CDI", digitos: "12" },
};

export const DIGTOS_CB = {
  bancos: [
    {
      nombre: "Banco de Crédito del Perú (BCP)",
      cantidadDigitosCuenta: 14,
    },
    {
      nombre: "BBVA Perú",
      cantidadDigitosCuenta: 18,
    },
    {
      nombre: "Interbank",
      cantidadDigitosCuenta: 13,
    },
    {
      nombre: "Scotiabank Perú",
      cantidadDigitosCuenta: 20,
    },
    {
      nombre: "Banco de la Nación",
      cantidadDigitosCuenta: 10,
    },
    {
      nombre: "BanBif",
      cantidadDigitosCuenta: 12,
    },
    {
      nombre: "Banco Pichincha",
      cantidadDigitosCuenta: 10,
    },
    {
      nombre: "Citibank Perú",
      cantidadDigitosCuenta: 12,
    },
    {
      nombre: "Banco GNB Perú",
      cantidadDigitosCuenta: 14,
    },
    {
      nombre: "Banco Falabella Perú",
      cantidadDigitosCuenta: 13,
    },
  ],
  cajas: [
    {
      nombre: "Caja Arequipa",
      cantidadDigitosCuenta: 14,
    },
    {
      nombre: "Caja Huancayo",
      cantidadDigitosCuenta: 14,
    },
    {
      nombre: "Caja Piura",
      cantidadDigitosCuenta: 10,
    },
    {
      nombre: "Caja Cusco",
      cantidadDigitosCuenta: 12,
    },
    {
      nombre: "Caja Sullana",
      cantidadDigitosCuenta: 14,
    },
    {
      nombre: "Caja Trujillo",
      cantidadDigitosCuenta: 12,
    },
    {
      nombre: "Caja Metropolitana",
      cantidadDigitosCuenta: 14,
    },
    {
      nombre: "Caja Tacna",
      cantidadDigitosCuenta: 14,
    },
    {
      nombre: "Caja Centro",
      cantidadDigitosCuenta: 14,
    },
    {
      nombre: "Caja Raíz",
      cantidadDigitosCuenta: 14,
    },
  ],
};

interface BancoType {
  nombre: string;
}
export const BANCO: { [key: number]: BancoType } = {
  74: { nombre: "Banco Continental" },
  75: { nombre: "Banco de Crédito del Perú" },
  377: { nombre: "Banco InterBank" },
  379: { nombre: "Banco Falabella" },
  380: { nombre: "aaa" },
  381: { nombre: "INTERBANK" },
  382: { nombre: "AAAA" },
  383: { nombre: "AAA" },
  384: { nombre: "BCP" },
  385: { nombre: "BanBif" },
  386: { nombre: "Pichincha" },
  397: { nombre: "Banco GNB" },
  652: { nombre: "Scotiabank" },
  865: { nombre: "Banco de la Nación" },
  902: { nombre: "Caja Arequipa{}" },
};
