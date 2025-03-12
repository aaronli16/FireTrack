import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/navbar.css';
import fireIcon from '../../public/img/fireicon.png';
import { getAuth, signOut } from 'firebase/auth';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function NavBar() {

  const handleSignOut = (e) =>{
    console.log("signing out");
    const auth = getAuth();
    signOut(auth);

  }
  
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when clicking on a link
  const closeMenu = () => {
    if (isOpen) setIsOpen(false);
  };

  return (
    <nav className={isOpen ? "nav-active" : ""}>
      <div className="nav-left">
        <Link to="/" className="nav-logo" aria-label="FireTrack Home" onClick={closeMenu}>
          <img src={fireIcon} alt="FireTrack Logo" />
          <span>FireTrack</span>
        </Link>
      </div>
      
      <div className="hamburger" onClick={toggleMenu}>
        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="hamburger-icon" />
      </div>

      <div className={`nav-right ${isOpen ? "show-menu" : ""}`}>
        <Link to="/fire-risk" onClick={closeMenu}>Fire Tracker</Link>
        <Link to="/community" onClick={closeMenu}>Community Posts</Link>
        <Link to="/fundraiser" onClick={closeMenu}>Fundraisers & Events</Link>
        <Link to="/login" onClick={closeMenu}>
          <button className="get-started-btn">Get Started</button>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;