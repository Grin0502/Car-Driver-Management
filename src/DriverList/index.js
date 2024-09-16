import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    // Fetch the list of drivers
    axios.get('/api/drivers').then(response => setDrivers(response.data));
  }, []);

  return (
    <div>
      <h2>Driver List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>Car</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map(driver => (
            <tr key={driver.id}>
              <td>{driver.name}</td>
              <td>{driver.dob}</td>
              <td>{driver.car ? `${driver.car.make} ${driver.car.model} (${driver.car.number})` : 'No Car Assigned'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DriverList;
