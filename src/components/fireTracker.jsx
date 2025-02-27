
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './styles/fireTracker.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function FireTracker() {
  const mapRef = useRef(null);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const map = L.map('map').setView([34.0522, -118.2437], 10);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Add example circle for fire risk area
    const circle = L.circle([34.0522, -118.2437], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 9000
    }).addTo(map);

    setTimeout(() => {
      map.invalidateSize();
    }, 100);
    return () => {
      map.remove();
    };
  }, []); 

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchInput);
    
  };

  return (
    <div>
      <section className="map-section">
        <div id="map"></div>
      </section>

      <section className="input-section">
        <form className="search-container" onSubmit={handleSearch}>
          <label htmlFor="search-input" className="visually-hidden">
            Input address
          </label>
          <button type="submit" className="search-button" aria-label="Search">
            <span className="fas fa-search search-icon" aria-hidden="true"></span>
          </button>
          <input
            type="text"
            id="search-input"
            className="search-input"
            placeholder="Enter Your Address"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </form>
        
      </section>
    </div>
  );
}

export default FireTracker;