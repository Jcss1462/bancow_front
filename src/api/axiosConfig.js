import axios from 'axios';

// URL base de la API
const API_URL = process.env.REACT_APP_API_URL; 

// Crear una instancia de axios
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
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
      window.location.href = '/'; // Redirigir al login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
