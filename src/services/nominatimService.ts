import axios from 'axios';

const BASE_URL = 'https://nominatim.openstreetmap.org/search';

export interface NominatimResult {
  display_name: string;
  address: {
    postcode?: string;
  };
}

export const getPostalCode = async (address: string): Promise<NominatimResult[]> => {
  try {
    const response = await axios.get<NominatimResult[]>(BASE_URL, {
      params: {
        q: address,
        format: 'json',
        addressdetails: 1,
        countrycodes: 'pe'
      },
    });

    console.log(response)
    return response.data;
    // const result = response.data[0];
    // if (result && result.address.postcode) {
    //   return result.address.postcode;
    // }

  } catch (error) {
    console.error('Error fetching postal code:', error);
    return [];
  }
};
