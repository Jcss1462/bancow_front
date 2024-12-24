import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Importar el archivo CSS

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token); // Guardar el token
      // Redirigir a la lista de simulaciones
      window.location.href = '/simulations';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center">
      <div className="card p-4 shadow-lg">
        <h1 className="text-center mb-4 text-black">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
