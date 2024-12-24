import axios from './axiosConfig';


export const login = async (data) => {
    try {
      const response = await axios.post('/Usuario/login', data);
      return response.data; 
    } catch (error) {
      console.error('Error al crear la simulación:', error);
      throw error;
    }
};

export const register = async (data) => {
    try {
      const response = await axios.post('/Usuario/register', data);
      return response.data; 
    } catch (error) {
      console.error('Error al crear la simulación:', error);
      throw error;
    }
};