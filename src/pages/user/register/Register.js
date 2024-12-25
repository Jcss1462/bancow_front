import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import './Register.css';
import { UserRegister } from '../../../models/userRegister';
import { register as registerApi } from '../../../api/userApi';
import { useAppDispatch } from '../../../context/AppSate';

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const dispatch = useAppDispatch();

    const onSubmit = async (data) => {
        dispatch({ type: "SET_LOADING", payload: true });
        try {
            // Crear una instancia del modelo
            const newUser = new UserRegister(data.email, data.password);
            await registerApi(newUser, dispatch);
            console.log('User registered:', newUser);
            toast.success('Usuario registrado exitosamente.');
            dispatch({ type: "SET_LOADING", payload: false });
            reset(); // Limpiar formulario
            window.location.href = '/';
        } catch (error) {
            try {
                const errormessage=error.response.data.split('at')[0];
                toast.error("Error al registrar usuario: "+errormessage);
                dispatch({ type: "SET_LOADING", payload: false });
            } catch (error) {
                toast.error("Error al registrar usuario");
                dispatch({ type: "SET_LOADING", payload: false });
            }
        }
    };

    return (
        <div className="register-container d-flex justify-content-center align-items-center">
            <div className="card p-4 shadow-lg">
                <h1 className="text-center mb-4 text-black tile">Registro</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Email */}
                    <div className="mb-3">
                        <input
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            placeholder="Email"
                            {...register('email', { required: 'El email es obligatorio' })}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <input
                            type="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            placeholder="Contraseña"
                            {...register('password', {
                                required: 'La contraseña es obligatoria',
                                minLength: { value: 6, message: 'Debe tener al menos 6 caracteres' },
                            })}
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                    </div>

                    {/* Botón */}
                    <button type="submit" className="btn btn-primary w-100">
                        Registrarse
                    </button>
                </form>
                <div className="text-center mt-3">
                    <a href="/" className="login-link">
                        ¿Ya tienes cuenta? <strong>Inicia sesión</strong>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Register;
