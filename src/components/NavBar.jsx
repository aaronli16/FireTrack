import React from 'react'
import { Link } from 'react-router-dom';
import './styles/navbar.css'
import fireIcon from '../img/fireicon.png'

function NavBar() {
  return (
    <nav>
      <div className="nav-left">
        <Link to="/" className="nav-logo" aria-label="FireTrack Home">
          <img src={fireIcon} alt="FireTrack Logo" />
          <span>FireTrack</span>
        </Link>
      </div>
      
     
        
    
      
      <div className="nav-right">
      <Link to="/fire-risk">Fire Risk Assessment</Link>
        <Link to="/community">Community Posts</Link>
        <Link to="/fundraiser">Fundraisers & Events</Link>
        <Link to="/login">
          <button className="get-started-btn">Get Started</button>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar