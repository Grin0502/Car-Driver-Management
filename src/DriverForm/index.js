import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DriverForm = ({ driverId, onSave }) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [carId, setCarId] = useState('');
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // Fetch the list of cars
    axios.get('http://localhost:8000/api/cars').then(response => setCars(response.data));

    // If editing a driver, fetch the driver's current data
    if (driverId) {
      axios.get(`http://localhost:8000/api/drivers/${driverId}`).then(response => {
        const { name, dob, car } = response.data;
        setName(name);
        setDob(dob);
        setCarId(car?.id || '');
      });
    }
  }, [driverId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const driverData = { name, dob, carId };

    const request = driverId 
      ? axios.put(`http://localhost:8000/api/drivers/${driverId}`, driverData) 
      : axios.post('http://localhost:8000/api/drivers', driverData);

    request.then(() => {
      onSave();
    }).catch(error => {
      console.error('There was an error saving the driver!', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Date of Birth:</label>
        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
      </div>
      <div>
        <label>Current Car:</label>
        <select value={carId} onChange={(e) => setCarId(e.target.value)} required>
          <option value="">Select a car</option>
          {cars.map(car => (
            <option key={car.id} value={car.id}>{car.make} {car.model} ({car.number})</option>
          ))}
        </select>
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default DriverForm;
