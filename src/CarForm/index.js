import React, { useState } from 'react';
import axios from 'axios';

const CarForm = ({ onSave }) => {
  const [number, setNumber] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const carData = { number, make, model };

    axios.post('http://localhost:8000/api/cars', carData).then(() => {
      onSave();
    }).catch(error => {
      console.error('There was an error saving the car!', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Car Number:</label>
        <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} required />
      </div>
      <div>
        <label>Make:</label>
        <input type="text" value={make} onChange={(e) => setMake(e.target.value)} required />
      </div>
      <div>
        <label>Model:</label>
        <input type="text" value={model} onChange={(e) => setModel(e.target.value)} required />
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default CarForm;
