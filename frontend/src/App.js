import weatherIcons from './weatherIcons';
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!city.trim()) {
      setError('Please enter a city name');
      setWeather(null);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/weather?city=${city}`);
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('Could not fetch weather. Try another city.');
      setWeather(null);
    }
  };

  return (
    <div className="app">
      <h1>🌤 Weather App</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Get Weather</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
  <div className="weather-info">
    <h2>{weather.name}, {weather.sys.country}</h2>

    <img
      src={`/icons/${weatherIcons[weather.weather[0].main] || 'default.png'}`}
      alt={weather.weather[0].description}
    />

    <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
    <p><strong>Condition:</strong> {weather.weather[0].description}</p>
    <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
  </div>
)}
    </div>
  );
}

export default App;
