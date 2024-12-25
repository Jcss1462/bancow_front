import React, { createContext, useReducer, useContext, useEffect } from "react";

// Define el estado inicial
const initialState = {
  token: null, // Token JWT
  isLoading: false, // Estado del loader
  email: null,
  idUsuario: null
};

// Define las acciones del reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        email: action.payload.email,
        idUsuario: action.payload.idUsuario,
        token: action.payload.token,
      };
    case "LOGOUT":
      return {
        ...state,
        email: null,
        token: null,
        idUsuario: null,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

// Crear el contexto
const AppStateContext = createContext();
const AppDispatchContext = createContext();

// Proveedor del contexto
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);


  // Efecto para validar el localStorage al cargar la aplicación
  useEffect(() => {
    const storedUserId = localStorage.getItem("idUsuario");
    const storedEmail = localStorage.getItem("email");
    const storedToken = localStorage.getItem("token");

    if (storedUserId && storedEmail && storedToken) {
      
      // Validamos si el token está expirado
      const tokenPayload = JSON.parse(atob(storedToken.split(".")[1])); // Decodificar el JWT
      const isTokenValid = tokenPayload.exp * 1000 > Date.now();

      if (isTokenValid) {
        dispatch({
          type: "LOGIN",
          payload: {email: storedEmail, token: storedToken, idUsuario: storedUserId},
        });
      } else {
        // Si el token está expirado, lo eliminamos del localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("idUsuario");
        dispatch({
          type: "LOGOUT",
          payload: {},
        });
      }
    //si no encuentra los eselemtnos limipia el estado
    }else{
      // Si el token está expirado, lo eliminamos del localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("idUsuario");
      dispatch({
        type: "LOGOUT",
        payload: {},
      });
    }
  }, []);


  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

// Hooks personalizados para acceder al contexto
export const useAppState = () => useContext(AppStateContext);
export const useAppDispatch = () => useContext(AppDispatchContext);
