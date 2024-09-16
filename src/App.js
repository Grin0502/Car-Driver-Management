import React, { useState } from 'react';
import DriverForm from './DriverForm';
import CarForm from './CarForm';
import DriverList from './DriverList';

function App() {
  const [page, setPage] = useState('drivers');
  const [editingDriverId, setEditingDriverId] = useState(null);

  const handleSave = () => {
    setPage('drivers');
    setEditingDriverId(null);
  };

  return (
    <div>
      <header>
        <button onClick={() => setPage('drivers')}>Driver List</button>
        <button onClick={() => setPage('newDriver')}>New Driver</button>
        <button onClick={() => setPage('newCar')}>New Car</button>
      </header>

      <main>
        {page === 'drivers' && <DriverList />}
        {page === 'newDriver' && <DriverForm driverId={editingDriverId} onSave={handleSave} />}
        {page === 'newCar' && <CarForm onSave={handleSave} />}
      </main>
    </div>
  );
}

export default App;
