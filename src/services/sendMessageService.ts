import axios from 'axios';
interface Parameters {
  phone:string,
  message:string
}

export const sendMessage = async ({phone,message}:Parameters) => {
  try {
    await axios.post("http://localhost:3001/send", {
      phone: `51${phone}`,
      message,
    });

    
    
  } catch (error) {
    console.error('Error fetching postal code:', error);
    return null;
  }
};
