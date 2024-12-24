import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SimulationsList() {
  const [simulations, setSimulations] = useState([]);

  useEffect(() => {
    const fetchSimulations = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/simulations', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSimulations(response.data);
    };
    fetchSimulations();
  }, []);

  return (
    <div>
      <h1>Simulations</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Amount</th>
            <th>Payment Term</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {simulations.map((sim) => (
            <tr key={sim.id}>
              <td>{sim.id}</td>
              <td>{sim.title}</td>
              <td>{sim.amount}</td>
              <td>{sim.paymentTerm}</td>
              <td>{sim.startDate}</td>
              <td>{sim.endDate}</td>
              <td>{sim.rate}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SimulationsList;
