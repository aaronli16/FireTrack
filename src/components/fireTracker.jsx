import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './styles/fireTracker.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'whatwg-fetch';


function FireTracker() {
  const mapRef = useRef(null);

  const [search, setSearch] = useState('');
  const [map, setMap] = useState(null);
  const [mark, setMarker] = useState(null);

  useEffect(() => {
    const mapInstance = L.map('map').setView([34.0522, -118.2437], 10);
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapInstance);

    setMap(mapInstance);
    
    setTimeout(() => {
      mapInstance.invalidateSize();
    }, 100);
    return () => {
      mapInstance.remove();
    };
  }, []); 

  function geocodeAddress(address) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
    
    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data && data.length > 0) {
          const location = data[0];
          return {
            lat: parseFloat(location.lat),
            lng: parseFloat(location.lon),
            displayName: location.display_name
          };
        }
        return null;
      })
      .catch(error => {
        console.error('Error geocoding address:', error);
        return null;
      });
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!search.trim()) return;
    
    geocodeAddress(search)
      .then(location => {
        if (location) {
          map.setView([location.lat, location.lng], 13);
          
          if (mark) {
            map.removeLayer(mark);
          }
          
          const newMarker = L.marker([location.lat, location.lng]).addTo(map);
          newMarker.bindPopup(location.displayName).openPopup();
          setMarker(newMarker);
        } else {
          alert("Address not found. Please try a different search.");
        }
      });
  };

  return (
    <div>
      <section className="map-section">
        <div id="map"></div>
      </section>
  
      <section className="input-section">
        <form className="search-container" onSubmit={handleSubmit}>
          <button type="submit" className="search-button" aria-label="Search">
            <span className="fas fa-search search-icon" aria-hidden="true"></span>
          </button>
          <input
            type="text"
            id="search-input"
            className="search-input"
            placeholder="Enter Your Address"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <label htmlFor="search-input" className="visually-hidden">
            Input address
          </label>
        </form>
      </section>
      
      <section className="report-button-section">
        <button className="add-report-button">Report a Fire</button>
      </section>
    </div>
  );
}

export default FireTracker;