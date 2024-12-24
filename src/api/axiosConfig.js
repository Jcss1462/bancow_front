import axios from 'axios';
import { healthCheckApi } from './healthCheckApi';

// URL base de la API
const API_URL = process.env.REACT_APP_API_URL; 

// Crear una instancia de axios
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Configura un interceptor para las solicitudes HTTP
axiosInstance.interceptors.request.use(async (config) => {

  const healthPath="/Health/health";
  // Verifica si la solicitud es un health check
  if (config.url && config.url.includes(healthPath)) {
    // Si es un health check, no ejecuta el healthCheckApi nuevamente
    return config;
  }

  try {
    await healthCheckApi(healthPath); // Verifica el estado del backend antes de realizar la solicitud
    return config;
  } catch (error) {
    // Si la verificación falla, no se enviará la solicitud
    return Promise.reject(error);
  }
}, (error) => {
  return Promise.reject(error);
});


// Interceptor para agregar el token JWT a cada solicitud
axiosInstance.interceptors.request.use(
  (config) => {    
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores globales
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Aquí puedes manejar errores globales, como redirigir al login si el token ha expirado
    if (error.response && error.response.status === 401) {
      // El token ha expirado o no es válido, eliminarlo del localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('idUsuario');
      localStorage.removeItem('email');
      window.location.href = '/'; // Redirigir al login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
