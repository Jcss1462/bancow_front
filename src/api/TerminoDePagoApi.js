import axios from './axiosConfig';


export const GetTreminosDePago = async () => {
    try {
      const response = await axios.get('/TerminoDePago/getTerminosDePago/');
      return response.data; 
    } catch (error) {
      console.error('Error al obtener los terminos de pago', error);
      throw error;
    }
};
