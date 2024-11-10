import React, { useState } from 'react';

const MileageTracker = () => {
  const [trips, setTrips] = useState([]);
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [distance, setDistance] = useState('');
  const [costPerMile, setCostPerMile] = useState(0.5); // Example cost per mile

  const addTrip = (event) => {
    event.preventDefault();
    if (!startLocation || !endLocation || !distance) return;

    const newTrip = {
      startLocation,
      endLocation,
      distance: parseFloat(distance),
      date: new Date(),
    };

    setTrips([...trips, newTrip]);
  };

  const calculateTotalDistance = () =>
    trips.reduce((total, trip) => total + trip.distance, 0);

  const calculateTotalCost = () => calculateTotalDistance() * costPerMile;

  return (
    <div>
      <h1>Mileage Tracker</h1>
      
      <form onSubmit={addTrip}>
        <input
          type="text"
          value={startLocation}
          placeholder="Start Location"
          onChange={(e) => setStartLocation(e.target.value)}
        />
        <input
          type="text"
          value={endLocation}
          placeholder="End Location"
          onChange={(e) => setEndLocation(e.target.value)}
        />
        <input
          type="number"
          value={distance}
          placeholder="Distance (miles)"
          onChange={(e) => setDistance(e.target.value)}
        />
        <button type="submit">Add Trip</button>
      </form>

      <TripList trips={trips} />
      <MonthlyReport trips={trips} costPerMile={costPerMile} />
    </div>
  );
};

const TripList = ({ trips }) => (
  <div>
    <h2>Trip Log</h2>
    <ul>
      {trips.map((trip, index) => (
        <li key={index}>
          {trip.startLocation} to {trip.endLocation} - {trip.distance} miles
        </li>
      ))}
    </ul>
  </div>
);

const MonthlyReport = ({ trips, costPerMile }) => {
  const currentMonthTrips = trips.filter(
    (trip) => new Date(trip.date).getMonth() === new Date().getMonth()
  );

  const totalDistance = currentMonthTrips.reduce(
    (total, trip) => total + trip.distance,
    0
  );

  const totalCost = totalDistance * costPerMile;

  return (
    <div>
      <h2>Monthly Report</h2>
      <p>Total Distance: {totalDistance} miles</p>
      <p>Total Mileage Cost: ${totalCost.toFixed(2)}</p>
    </div>
  );
};

export default MileageTracker;
