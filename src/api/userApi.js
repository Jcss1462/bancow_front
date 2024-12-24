import { jwtDecode } from 'jwt-decode';
import axios from './axiosConfig';

export const login = async (data,dispatch) => {
    try {
      const response = await axios.post('/Usuario/login', data);
      
      const  token = response.data.token;
      // Decodifica el token
      const decodedToken = jwtDecode(token);
      const email = decodedToken.email; // Extrae el email
      const idUsuario = decodedToken.IdUsuario;

      localStorage.setItem('token', token);
      localStorage.setItem("email", email);
      localStorage.setItem("idUsuario", idUsuario);

      dispatch({
        type: "LOGIN",
        payload: {
          token:token,
          email:email,
          idUsuario:idUsuario,
        },
      });
          
      return response.data; 
    } catch (error) {
      console.error('Error al iniciar sesion', error);
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