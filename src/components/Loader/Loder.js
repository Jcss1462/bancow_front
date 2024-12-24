import React from 'react';
import { RingLoader } from 'react-spinners'; // Importar un tipo de spinner
import './Loader.css'; // Estilo para el spinner
import { useAppState } from '../../context/AppSate';

const Loader = () => {

    const { isLoading } = useAppState();

    return (
        isLoading && (
            <div className="loader-overlay">
                <RingLoader color="#36d7b7" loading={isLoading} size={150} />
            </div>
        )
    );
};

export default Loader;
