import axios from "axios";
import { API_BASE_URL } from "../constants/constants";
interface Parameters {
  tipo: string;
  numero: string | number;
}

export const getInfoByDocument = async ({ tipo, numero }: Parameters) => {
  try {
    const response = await axios.get(`${API_BASE_URL}formulario/getDocument`, {
      params: {
        tipo,
        numero,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data
  } catch (error) {
    console.error("Error fetching postal code:", error);
    return null;
  }
};
