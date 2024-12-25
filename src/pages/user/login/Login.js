import React from 'react';
import './Login.css'; // Importar el archivo CSS
import { login } from '../../../api/userApi';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../context/AppSate';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // Si quieres redirigir de forma programática
import { UserLogin } from '../../../models/userLogin';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const user = new UserLogin(data.email, data.password);

      // Llamada a la API para login
      await login(user, dispatch);

      // Redirigir a la lista de simulaciones
      navigate('/simulations');
      dispatch({ type: "SET_LOADING", payload: false });
    } catch (error) {
      try {
        const errormessage = error.response.data.split('at')[0];
        toast.error("Error al iniciar sesión: "+errormessage);
        dispatch({ type: "SET_LOADING", payload: false });
      } catch (error) {
        toast.error("Error al iniciar sesión");
        dispatch({ type: "SET_LOADING", payload: false });
      }
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow-lg">
        <h1 className="text-center mb-4 text-black">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="Email"
              {...register('email', {
                required: 'Email es requerido',
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: 'Email no válido'
                }
              })}
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>
          <div className="mb-3">
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              placeholder="Password"
              {...register('password', {
                required: 'La contraseña es requerida',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres'
                }
              })}
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <div className="text-center mt-3">
          <a href="/register" className="register-link">¿No tienes cuenta? <strong>Regístrate</strong></a>
        </div>
      </div>
    </div>
  );
}

export default Login;
