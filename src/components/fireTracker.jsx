import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './styles/fireTracker.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'whatwg-fetch';
import AddReport from './addReport.jsx';


const DEFAULT_CENTER = [34.0522, -118.2437];
const DEFAULT_ZOOM = 10;


const MAP_POSITION_KEY = 'fireMapPosition';

function FireTracker({ reportedFires, setReportedFires }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const circlesRef = useRef([]);
  const isMountedRef = useRef(true);

  const [search, setSearch] = useState('');
  const [marker, setMarker] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddReportOpen, setIsAddReportOpen] = useState(false);
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);
  const [mapReady, setMapReady] = useState(false);


  useEffect(() => {
    isMountedRef.current = true;

    
    if (!mapContainerRef.current) return;

  
    let initialPosition;
    try {
      // replace this with fire base db later
      const savedPosition = localStorage.getItem(MAP_POSITION_KEY);
      initialPosition = savedPosition ? JSON.parse(savedPosition) : null;
    } catch (error) {
      console.error('Error retrieving saved map position:', error);
      initialPosition = null;
    }

   
    const center = initialPosition?.center || DEFAULT_CENTER;
    const zoom = initialPosition?.zoom || DEFAULT_ZOOM;
    
    console.log('Initializing map with position:', { center, zoom });

   
    const mapInstance = L.map(mapContainerRef.current, {
      center: center,
      zoom: zoom
    });
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapInstance);

 
    mapInstanceRef.current = mapInstance;
    
     // so we go back to the where we left off on map
    function saveCurrentPosition() {
      if (!isMountedRef.current || !mapInstanceRef.current) return;

      const currentCenter = mapInstanceRef.current.getCenter();
      const currentZoom = mapInstanceRef.current.getZoom();
      
      const positionToSave = {
        center: [currentCenter.lat, currentCenter.lng],
        zoom: currentZoom
      };
      
      try {
        localStorage.setItem(MAP_POSITION_KEY, JSON.stringify(positionToSave));
      } catch (error) {
        console.error('Error saving map position:', error);
      }
    }

    mapInstance.on('moveend', saveCurrentPosition);
    mapInstance.on('zoomend', saveCurrentPosition);
    
   
    mapInstance.whenReady(() => {
      if (isMountedRef.current) {
        mapInstance.invalidateSize();
        setMapReady(true);
        console.log('Map is ready and properly sized');
      }
    });
    
    
    return () => {
      console.log('Cleaning up map...');
      isMountedRef.current = false;
      
      
      if (circlesRef.current.length > 0) {
        circlesRef.current.forEach(function(circle) {
          if (mapInstanceRef.current && circle) {
            try {
              mapInstanceRef.current.removeLayer(circle);
            } catch (e) {
          
            }
          }
        });
        circlesRef.current = [];
      }
      
      if (mapInstanceRef.current) {
      
        try {
          saveCurrentPosition();
        } catch (e) {
         
        }
        
       
        try {
          mapInstanceRef.current.off('moveend', saveCurrentPosition);
          mapInstanceRef.current.off('zoomend', saveCurrentPosition);
        } catch (e) {
  
        }
        
       
        try {
          mapInstanceRef.current.remove();
        } catch (e) {
         
        }
        
        mapInstanceRef.current = null;
      }
    };
  }, []);
  
  
  useEffect(() => {
    
    if (!mapReady || !mapInstanceRef.current || !isMountedRef.current) return;
    if (!reportedFires || !Array.isArray(reportedFires) || reportedFires.length === 0) return;
    
    console.log('Adding fire circles to map...', reportedFires.length);
    
   
    circlesRef.current.forEach(function(circle) {
      if (mapInstanceRef.current && circle) {
        try {
          mapInstanceRef.current.removeLayer(circle);
        } catch (e) {
          console.error('Error removing circle:', e);
        }
      }
    });
    circlesRef.current = [];
    
    
    reportedFires.forEach(function(fire) {
      const { location, severity, status } = fire;
      if (location && location.lat && location.lng) {
        const circle = addFireCircleToMap(fire);
        if (circle) {
          circlesRef.current.push(circle);
        }
      }
    });
    
  }, [mapReady, reportedFires]);

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
  
  function handleSearch(e) {
    e.preventDefault();
    
    if (!search.trim() || !mapInstanceRef.current) return;
    
    setIsLoading(true);
    
    geocodeAddress(search)
      .then(location => {
        if (location && mapInstanceRef.current && isMountedRef.current) {
          mapInstanceRef.current.setView([location.lat, location.lng], 13);
          
          if (marker) {
            try {
              mapInstanceRef.current.removeLayer(marker);
            } catch (e) {
              console.error('Error removing marker:', e);
            }
          }
          
          const newMarker = L.marker([location.lat, location.lng]).addTo(mapInstanceRef.current);
          newMarker.bindPopup(location.displayName).openPopup();
          setMarker(newMarker);
        } else {
          alert("Address not found. Please try a different search.");
        }
      })
      .catch(error => {
        console.error("Error during search:", error);
        alert("An error occurred while searching. Please try again.");
      })
      .finally(() => {
        if (isMountedRef.current) {
          setIsLoading(false);
        }
      });
  }

  function handleOpenAddReport() {
    setIsAddReportOpen(true);
  }

  function handleCloseAddReport() {
    setIsAddReportOpen(false);
  }


  // Used chatgpt to figure out formulas for distance
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; 
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; 
  }



  function findClosestActiveFire(lat, lng, maxDistance = 1000) {
    const activeFires = reportedFires.filter(function(fire) {
      return fire.status !== 'cleared' && 
        fire.location && 
        fire.location.lat && 
        fire.location.lng;
    });

    if (activeFires.length === 0) {
      return null;
    }

    let closestFire = null;
    let minDistance = Infinity;

    activeFires.forEach(function(fire) {
      const distance = calculateDistance(
        lat, 
        lng, 
        fire.location.lat, 
        fire.location.lng
      );

      if (distance < minDistance) {
        minDistance = distance;
        closestFire = fire;
      }
    });

    return minDistance <= maxDistance ? {
      fire: closestFire,
      distance: minDistance
    } : null;
  }
  
  // Chatgpt helped determine color and distance relative to severity.
  function getSeverityColor(severity) {
    switch (severity) {
      case 'low':
        return '#FFC107'; // Yellow
      case 'medium':
        return '#FF9800'; // Orange
      case 'high':
        return '#FF5722'; // Deep Orange
      case 'critical':
        return '#F44336'; // Red
      default:
        return '#FF9800'; // Default to orange
    }
  }

  function getClearedColor() {
    return '#4CAF50'; // Green for cleared fires
  }

  function getSeverityRadius(severity) {
    switch (severity) {
      case 'low':
        return 300; // 300 meters
      case 'medium':
        return 500; // 500 meters
      case 'high':
        return 800; // 800 meters
      case 'critical':
        return 1200; // 1.2 kilometers
      default:
        return 500; // Default medium radius
    }
  }


  function addFireCircleToMap(fireReport) {

    if (!mapInstanceRef.current || !isMountedRef.current) return null;
    if (!fireReport || !fireReport.location) return null;
    
    const { location, severity, status, description } = fireReport;
    
 
    if (!location.lat || !location.lng) return null;
    
    try {
      const circleColor = status === 'cleared' ? getClearedColor() : getSeverityColor(severity);
      const circleRadius = getSeverityRadius(severity);
      const fillOpacity = status === 'cleared' ? 0.2 : 0.3;
      const dashArray = status === 'cleared' ? '5, 10' : null;
      
      const fireCircle = L.circle([location.lat, location.lng], {
        color: circleColor,
        fillColor: circleColor,
        fillOpacity: fillOpacity,
        radius: circleRadius,
        dashArray: dashArray
      }).addTo(mapInstanceRef.current);
      
      const statusLabel = status === 'cleared' ? 'CLEARED' : 'ACTIVE';
      const statusClass = status === 'cleared' ? 'cleared-status' : 'active-status';
      

      // used chatgpt to help me figure out pop up tabs
      const popupContent = `
        <div class="fire-popup">
          <h3>
            ${status === 'cleared' ? '<span class="cleared-icon">✓</span>' : '<span class="fire-icon">🔥</span>'}
            Fire Report <span class="${statusClass}">${statusLabel}</span>
          </h3>
          <p><strong>Location:</strong> ${location.displayName}</p>
          ${status !== 'cleared' ? `<p><strong>Severity:</strong> ${severity.charAt(0).toUpperCase() + severity.slice(1)}</p>` : ''}
          <p><strong>Reported:</strong> ${new Date(fireReport.reportedAt).toLocaleString()}</p>
          ${description ? `<p><strong>Notes:</strong> ${description}</p>` : ''}
        </div>
      `;
      
      fireCircle.bindPopup(popupContent);
      
      return fireCircle;
    } catch (error) {
      console.error('Error adding fire circle to map:', error);
      return null;
    }
  }

  function handleSubmitReport(formData) {
    if (!mapInstanceRef.current || !isMountedRef.current) {
      alert("Map is not ready. Please try again.");
      return;
    }
    
    setIsSubmittingReport(true);
    
    const fullAddress = `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`;
    
    geocodeAddress(fullAddress)
      .then(location => {
        if (location && mapInstanceRef.current && isMountedRef.current) {
          if (formData.status === 'cleared') {
            const nearbyFire = findClosestActiveFire(location.lat, location.lng);
            
            if (!nearbyFire) {
              setIsSubmittingReport(false);
              alert("No active fires found near this location. Please check the address or report as an active fire.");
              return;
            }
            
            const distanceInMeters = Math.round(nearbyFire.distance);
            const distanceText = distanceInMeters < 1000 
              ? `${distanceInMeters} meters` 
              : `${(distanceInMeters / 1000).toFixed(1)} km`;
              
            const confirmClear = window.confirm(
              `Found an active fire about ${distanceText} from this location.\nDo you want to mark it as cleared?`
            );
            
            if (!confirmClear) {
              setIsSubmittingReport(false);
              return;
            }
          }
          
          const newFireReport = {
            ...formData,
            id: Date.now(), // we can use this as they key id
            location: {
              lat: location.lat,
              lng: location.lng,
              displayName: location.displayName
            },
            reportedAt: new Date().toISOString()
          };
          
         
          setReportedFires(function(prev) {
            return [...prev, newFireReport];
          });
          
      
          mapInstanceRef.current.setView([location.lat, location.lng], 14);
          
  
          setIsAddReportOpen(false);
          
          const message = formData.status === 'cleared' 
            ? "Thank you! The fire has been marked as cleared on the map."
            : "Fire report submitted successfully!";
          
          alert(message);
        } else {
          alert("Could not locate the address. Please check and try again.");
        }
      })
      .catch(error => {
        console.error("Error submitting fire report:", error);
        alert("An error occurred while submitting the report. Please try again.");
      })
      .finally(() => {
        if (isMountedRef.current) {
          setIsSubmittingReport(false);
        }
      });
  }

  return (
    <div>
      <section className="map-section">
        <div id="map" ref={mapContainerRef}></div>
      </section>
  
      <section className="input-section">
        <form className="search-container" onSubmit={handleSearch}>
          <button type="submit" className="search-button" aria-label="Search" disabled={isLoading || !mapReady}>
            {isLoading ? (
              <span className="spinner-icon" aria-hidden="true"></span>
            ) : (
              <span className="fas fa-search search-icon" aria-hidden="true"></span>
            )}
          </button>
          <input
            type="text"
            id="search-input"
            className="search-input"
            placeholder="Enter Your Address"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={isLoading || !mapReady}
          />
          {isLoading && (
            <div className="loading-indicator">
              <span className="spinner"></span>
            </div>
          )}
          <label htmlFor="search-input" className="visually-hidden">
            Input address
          </label>
        </form>
      </section>
      
      <section className="report-button-section">
        <button 
          className="add-report-button"
          onClick={handleOpenAddReport}
          disabled={!mapReady}
        >
          Report a Fire
        </button>
      </section>
      
      <AddReport
        isOpen={isAddReportOpen}
        onClose={handleCloseAddReport}
        onSubmit={handleSubmitReport}
        isLoading={isSubmittingReport}
      />
    </div>
  );
}

export default FireTracker;