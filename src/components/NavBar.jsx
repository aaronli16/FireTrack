import React from 'react'
import { Link } from 'react-router-dom';
import '../index.css'
import fireIcon from '../img/fireicon.png'
function NavBar() {
  return (
    <nav>
      <Link to="/" className="nav-logo" aria-label="FireTrack Home">
        <img src={fireIcon} alt="FireTrack Logo" />
        <span>FireTrack</span>
      </Link>
      <Link to="/fire-risk">Fire Risk Assessment</Link>
      <Link to="/community">Community Posts</Link>
      <Link to="/fundraiser">Fundraisers & Events</Link>
    </nav>
  );
}

export default NavBar