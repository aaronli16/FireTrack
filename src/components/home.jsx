import React from 'react';
import './styles/Home.css';
import { Link } from 'react-router-dom';
function HomePage() {
  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <h1>Community Based Real-Time Fire Risk Assessment</h1>
          <p>Stay informed and protected with live fire tracking and community alerts</p>
          <Link to="/fire-risk" className="risk-button">Check Your Area's Risk Level</Link>
        </div>
      </section>

      <section className="features">
        <h2>Essential Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <span className="fas fa-map-marked-alt"></span>
            <h3>Risk Assessment</h3>
            <p>Real-time fire risk evaluation for your area</p>
          </div>
          <div className="feature-card">
            <span className="fas fa-bell"></span>
            <h3>Alert System</h3>
            <p>Instant notifications for fire warnings</p>
          </div>
          <div className="feature-card">
            <span className="fas fa-users"></span>
            <h3>Community Updates</h3>
            <p>Local reports and community information</p>
          </div>
        </div>
      </section>

      <section className="resources">
        <h2>Resources</h2>
        <div className="resource-grid">
          <a href="resources/wildfire-evacuation-checklist.pdf" className="resource-card" download="wildfire-evacuation-guide.pdf" aria-label="Download Evacuation Guide PDF">
            <span className="fas fa-file-alt" aria-hidden="true"></span>
            <span>Evacuation Guide</span>
          </a>
          <a href="resources/Safety-tips-fireTrack.pdf" className="resource-card" download="safety-tips-fireTrack.pdf" aria-label="Download Safety Tips">
            <span className="fas fa-exclamation-triangle" aria-hidden="true"></span>
            <span>Safety Tips</span>
          </a>
          <Link to="community" className="resource-card" aria-label="Visit Community Forum">
            <span className="fas fa-users" aria-hidden="true"></span>
            <span>Community Forum</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;