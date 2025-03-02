import React, { useState, useEffect } from 'react';

const Fundraiser = () => {
  const [searchInput, setSearchInput] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);


  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!searchInput) {
      setError('Please enter an address.');
      return;
    }

    const encodedAddress = encodeURIComponent(searchInput);
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${API_KEY}`;

    fetch(geocodeUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const firstResult = data.results[0];
          setUserAddress(firstResult.formatted_address);
          setUserLocation(firstResult.geometry.location);
        } else {
          setError('No address found for that input.');
        }
      })
      .catch((err) => {
        setError(`Error fetching address: ${err.message}`);
      });
  };

  return (
    <div>
      <main>
        <form className="search-container" onSubmit={handleSearchSubmit}>
          <label htmlFor="search-input" className="visually-hidden">
            Search for Fundraisers
          </label>
          <button type="submit" className="search-button" aria-label="Search">
            <span className="fas fa-search search-icon" aria-hidden="true"></span>
          </button>
          <input
            type="text"
            id="search-input"
            className="search-input"
            placeholder="Enter Your Address to Find More Near You"
            aria-label="Search for Fundraisers"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </form>

        {error && <div className="error">{error}</div>}

        {userLocation && (
          <div className="user-location">
            <p>
              Your coordinates: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
            </p>
          </div>
        )}
        {userAddress && (
          <div className="user-address">
            <p>Your address: {userAddress}</p>
          </div>
        )}


        <section className="fundraising">
          <div className="fundraiser-container">
            <div className="fundraiser-card">
              <img src="src/img/wildfire.jpg" alt="Wildfire in a forest" />
              <div className="card-content">
                <h3>California Wildfire Relief Effort</h3>
                <p>
                  Help support families affected by recent wildfires. Every donation makes a difference.
                </p>
                <a
                  href="https://greatergood.org/disaster-relief/california-wildfires?https://greatergood.org/disaster-relief/california-wildfires&utm_term=&utm_campaign=DELVE_US_GGC_G_PMAX_DisasterRelief_Wildfire&utm_source=google&utm_medium=cpc&hsa_acc=6245854046&hsa_cam=22178490238&hsa_grp=&hsa_ad=&hsa_src=x&hsa_tgt=&hsa_kw=&hsa_mt=&hsa_net=adwords&hsa_ver=3&gad_source=1&gclid=Cj0KCQiAoJC-BhCSARIsAPhdfSj2h4BDbZO07GDbCrhbhgWA0GTLo6XdULSYViFdsD1DPv64697lc9IaAsfNEALw_wcB"
                  className="donate-btn"
                  target="_blank"
                  aria-label="Donate to Wildfire Relief Effort"
                >
                  Donate
                </a>
              </div>
            </div>

            <div className="fundraiser-card">
              <img src="src/img/firefighter.jpg" alt="Firefighters on roof fighting fire" />
              <div className="card-content">
                <h3>Firefighter Support Fund</h3>
                <p>
                  Support our brave firefighters with essential resources and medical aid.
                </p>
                <a
                  href="https://www.nvfc.org/nvfc-volunteer-firefighter-support-fund/"
                  className="donate-btn"
                  target="_blank"
                  aria-label="Donate to Firefighter Support Fund"
                >
                  Donate
                </a>
              </div>
            </div>

            <div className="fundraiser-card">
              <img src="src/img/forest.jpg" alt="Forest with mountain in the background" />
              <div className="card-content">
                <h3>Rebuilding Forests</h3>
                <p>
                  Help replant trees and restore natural habitats affected by wildfires.
                </p>
                <a
                  href="https://plantwithpurpose.org/reforestation/?gad_source=1&gclid=Cj0KCQiAoJC-BhCSARIsAPhdfSh7_8s8IcOVwfsYpj0EHotl6KCJtipXCs1Q9x5LyZ88wAyCwuTdMeEaAgSqEALw_wcB"
                  className="donate-btn"
                  target="_blank"
                  aria-label="Donate to Rebuilding Forests"
                >
                  Donate
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Fundraiser;
