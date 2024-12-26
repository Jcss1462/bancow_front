import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Asegúrate de importar el archivo CSS
import { useAppDispatch, useAppState } from '../../context/AppSate';

function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const { token } = useAppState();

  const dispatch = useAppDispatch();

  // Función para abrir/cerrar el sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Efecto para cerrar el sidebar al cambiar el tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cerrar el sidebar al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  const handleLogout = () => {
    // Aquí puedes agregar la lógica de cierre de sesión
    console.log('Cerrando sesión...');

    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("idUsuario");
    dispatch({
      type: "LOGOUT",
      payload: {},
    });

    window.location.href = '/'; // Redirigir al login

  };

  return (
    <header className="header">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Nombre de la aplicación */}
        <h1 className="app-name">Simulaciones App</h1>

        {/* Botón de menú para pantallas pequeñas */}
        <button className="menu-btn" onClick={toggleSidebar}>
          <span className="menu-icon">&#9776;</span>
        </button>

        {/* Panel lateral (sidebar) */}
        <div ref={sidebarRef} className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          {/* Botón para cerrar el sidebar */}
          <button
            className="close-btn"
            onClick={() => setIsSidebarOpen(false)}>
            &times;
          </button>

          <ul className="sidebar-links list-unstyled">
            {token == null ? (
              <>
                <li>
                  <Link to="/" className="nav-item">Iniciar Sesión</Link>
                </li>
                <li>
                  <Link to="/register" className="nav-item">Registrarse</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/simulations" className="nav-item" > <i class="bi bi-card-checklist"></i> Mis Simulaciones</Link>
                </li>
                <li>
                  <Link className="nav-item" onClick={handleLogout} >Cerrar Sesión</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Opciones de navegación visibles solo en pantallas grandes */}
        <nav className="nav-links">
          <ul className="d-flex m-0 p-0 nav-list">

            {token == null ? (
              <>
                <li>
                  <Link to="/" className="nav-item">Iniciar Sesión</Link>
                </li>
                <li>
                  <Link to="/register" className="nav-item">Registrarse</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/simulations" className="nav-item" > <i class="bi bi-card-checklist"></i> Mis Simulaciones</Link>
                </li>
                <li>
                  <Link className="nav-item" onClick={handleLogout} >Cerrar Sesión</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
