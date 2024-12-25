import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppState } from '../../../context/AppSate';
import { GetSimulationsListByMail } from '../../../api/simulationApi';
import { toast } from 'react-toastify';
import './SimulationsList.css';

function SimulationsList() {
  const [simulations, setSimulations] = useState([]);
  const { email } = useAppState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchSimulations = async () => {
      if (!email) return;

      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const data = await GetSimulationsListByMail(email);
        setSimulations(data);
      } catch (error) {
        const errormessage = error.response?.data?.split('at')[0] || "Error desconocido";
        toast.error("Error al tratar de obtener las simulaciones: " + errormessage);
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    fetchSimulations();
  }, [email, dispatch]);

  return (
    <div className="container mx-auto">
      <h1 className="title text-center mb-4">Simulaciones</h1>

      {simulations.length > 0 ? (
        <table className="table table-bordered table-striped table-hover text-center">
          <thead className="thead-custom">
            <tr>
              <th>ID</th>
              <th>Titulo</th>
              <th>Monto</th>
              <th>Termino de pago</th>
              <th>Fecha Inicial</th>
              <th>Fecha Final</th>
              <th>Tasa</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {simulations.map((sim) => (
              <tr key={sim.idSimulacion}>
                <td>{sim.idSimulacion}</td>
                <td>{sim.titulo}</td>
                <td>{sim.monto}</td>
                <td>{sim.terminoPagoId}</td>
                <td>{sim.fechaInicio}</td>
                <td>{sim.fechaFin}</td>
                <td>{sim.tasa}</td>
                <td className="ActionButtons">
                  <button className="btn btn-warning">
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button className="btn btn-danger ms-2">
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-muted mt-4">
          <h5>Aún no tienes simulaciones creadas</h5>
        </div>
      )}

      {/* Botón fijo con respecto a la aplicación */}
      <button
        className="btn btn-primary rounded-circle position-fixed"
        style={{ width: '60px', height: '60px', bottom: '100px', right: '40px' }}
      >
        <i className="bi bi-plus"></i>
      </button>
    </div>
  );
}

export default SimulationsList;
