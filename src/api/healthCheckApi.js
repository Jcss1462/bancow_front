import { toast } from 'react-toastify';
import axios from './axiosConfig';

export const healthCheckApi = async (healthPath) => {
    try {
      const response = await axios.get(healthPath);      
      return response; 
    } catch (error) {
      const errMsg="El Backend de la aplicacion no esta disponible";
      toast.error(errMsg);
      throw errMsg;
    }
};
