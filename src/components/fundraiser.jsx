import React from 'react';

const Fundraiser = () => {
  return (
    <div>
      <main>
        <form className="search-container">
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
          />
        </form>

        <section className="fundraising">
          <div className="fundraiser-container">
            <div className="fundraiser-card">
              <img src="src/img/wildfire.jpg" alt="Wildfire in a forest" />
              <div className="card-content">
                <h3>Wildfire Relief Effort</h3>
                <p>
                  Help support families affected by recent wildfires. Every donation makes a difference.
                </p>
                <button className="donate-btn" aria-label="Donate to Wildfire Relief Effort">
                  Donate
                </button>
              </div>
            </div>

            <div className="fundraiser-card">
              <img src="src/img/firefighter.jpg" alt="Firefighters on roof fighting fire" />
              <div className="card-content">
                <h3>Firefighter Support Fund</h3>
                <p>
                  Support our brave firefighters with essential resources and medical aid.
                </p>
                <button className="donate-btn" aria-label="Donate to Firefighter Support Fund">
                  Donate
                </button>
              </div>
            </div>

            <div className="fundraiser-card">
              <img src="src/img/forest.jpg" alt="Forest with mountain in the background" />
              <div className="card-content">
                <h3>Rebuilding Forests</h3>
                <p>
                  Help replant trees and restore natural habitats affected by wildfires.
                </p>
                <button className="donate-btn" aria-label="Donate to Rebuilding Forests">
                  Donate
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Fundraiser;
