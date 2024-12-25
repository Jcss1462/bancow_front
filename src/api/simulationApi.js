import axios from './axiosConfig';


export const GetSimulationsListByMail = async (email) => {
    try {
      const response = await axios.get('/Simulacion/getSimulations/'+email);
      return response.data; 
    } catch (error) {
      console.error('Error al obtener las simulaciones:', error);
      throw error;
    }
};