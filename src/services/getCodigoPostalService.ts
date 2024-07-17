import axios from 'axios';

const API_KEY = 'AIzaSyCS-oZ0gYcDEZLlzKrb2a2pORyCxJ7cwWo';
const BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

interface GeocodeResult {
  results: {
    address_components: {
      long_name: string;
      short_name: string;
      types: string[];
    }[];
  }[];
}

export const getPostalCode = async (address: string): Promise<string | null> => {
  try {
    const response = await axios.get<GeocodeResult>(BASE_URL, {
      params: {
        address,
        key: API_KEY,
      },
    });

    // console.log("💻 - file: getCodigoPostalService.ts:28 - getPostalCode - response:", response)
    const result = response.data.results[0];
    if (result) {
      const postalCode = result.address_components.find(component =>
        component.types.includes('postal_code')
      );
      // console.log("💻 - file: getCodigoPostalService.ts:30 - getPostalCode - postalCode:", postalCode)
      return postalCode ? postalCode.long_name : null;
    }
    return null;
  } catch (error) {
    console.error('Error fetching postal code:', error);
    return null;
  }
};
