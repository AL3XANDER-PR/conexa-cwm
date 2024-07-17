// src/services/apiService.ts

import axios, { AxiosInstance, AxiosResponse } from "axios";
import { API_BASE_URL } from "../constants/constants";
import { CatalogItem } from "../shared/FormInputs/SelectInput";
import { Country, Department } from "../shared/FormInputs/SelectDireccion";

// Configuración de Axios
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL, // URL base de la API
  timeout: 5000, // Tiempo de espera de la solicitud
  headers: {
    "Content-Type": "application/json",
    // 'Content-Type': 'multipart/form-data'
  },
});

// Función para obtener datos (GET) con parámetros
export const fetchData = async <T>(
  endpoint: string,
  params: any
): Promise<T> => {
  const response: AxiosResponse<T> = await api.get(endpoint, { params });
  return response.data;
};

export const fetchDataP = async (endpoint: string,data: any): Promise<CatalogItem[]> => {
  const response: AxiosResponse<{ data: CatalogItem[] }> = await api.post(endpoint,data);
  return response.data.data;
};

// Función para enviar datos (POST) con cuerpo
export const postData = async <ApiResponse>(
  endpoint: string,
  data: any
): Promise<ApiResponse> => {
  const response: ApiResponse = await api.post(endpoint, data);
  return response;
};

// Función para actualizar datos (PUT) con cuerpo
export const updateData = async <T>(
  endpoint: string,
  data: any
): Promise<T> => {
  const response: AxiosResponse<T> = await api.put(endpoint, data);
  return response.data;
};

// Función para eliminar datos (DELETE) con parámetros
export const deleteData = async <T>(
  endpoint: string,
  params: any
): Promise<T> => {
  const response: AxiosResponse<T> = await api.delete(endpoint, { params });
  return response.data;
};

// Puedes agregar más funciones de servicio aquí según sea necesario



// departamento 
export const getPais = async (endpoint: string,data: any): Promise<Country[]> => {
  const response: AxiosResponse<{ data: Country[] }> = await api.post(endpoint,data);
  return response.data.data;
};

export const getUbigeo = async (endpoint: string,data: any): Promise<Department[]> => {
  const response: AxiosResponse<{ data: Department[] }> = await api.post(endpoint,data);
  return response.data.data;
};