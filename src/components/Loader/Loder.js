import React from 'react';
import { CircleLoader } from 'react-spinners'; // Importar un tipo de spinner
import './Loader.css'; // Estilo para el spinner

const Loader = ({ loading }) => {
  return (
    loading && (
      <div className="loader-overlay">
        <CircleLoader color="#36d7b7" loading={loading} size={150} />
      </div>
    )
  );
};

export default Loader;
