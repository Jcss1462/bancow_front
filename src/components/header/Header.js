import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-primary text-white p-3">
      <div className="container">
        <h1 className="text-white">Simulaciones App</h1>
        <nav>
          <ul className="list-unstyled d-flex">
            <li className="mr-3">
              <Link to="/" className="text-white">Login</Link>
            </li>
            <li className="mr-3">
              <Link to="/simulations" className="text-white">Simulations</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
