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


export const GetSimulationById = async (id) => {
  try {
    const response = await axios.get('/Simulacion/getSimulationsById/'+id);
    return response.data; 
  } catch (error) {
    console.error('Error al obtener la informacion de la simulacion', error);
    throw error;
  }
};


export const UpdateSimulation = async (simulation) => {
  try {
    const response = await axios.put('/Simulacion/updateSimulation',simulation);
    return response.data; 
  } catch (error) {
    console.error('Error al tratar de actualiza la simulacion', error);
    throw error;
  }
};

export const CreateSimulation = async (simulation) => {
  try {
    const response = await axios.post('/Simulacion/createSimulation',simulation);
    return response.data; 
  } catch (error) {
    console.error('Error al tratar de crear simulacion', error);
    throw error;
  }
};