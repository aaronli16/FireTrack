import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./styles/styles.css";

import { getAuth, signOut } from "firebase/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";

function NavBar({ isLoggedIn }) {
  const fireTrackLogo = "../../img/FireTrack_Logo.png";
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileToggle, setProfileToggle] = useState(false);
  const profileRef = useRef(null);

  const handleSignOut = (e) => {
    console.log("signing out");
    const auth = getAuth();
    signOut(auth);
  };

  const handleProfileToggle = (e) => {
    setProfileToggle(!showProfileToggle);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    if (isOpen) setIsOpen(false);
  };

 // Click anywhere on the screen to close the profile dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileToggle(false);
      }
    }

    
    if (showProfileToggle) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileToggle]);

  return (
    <nav className={isOpen ? "nav-active" : ""}>
      <div className="nav-left">
        <Link
          to="/"
          className="nav-logo"
          aria-label="FireTrack Home"
          onClick={closeMenu}
        >
          <img src={fireTrackLogo} alt="FireTrack Logo" />
        </Link>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <FontAwesomeIcon
          icon={isOpen ? faTimes : faBars}
          className="hamburger-icon"
        />
      </div>

      <div className={`nav-right ${isOpen ? "show-menu" : ""}`}>
        <Link to="/fire-risk" onClick={closeMenu}>
          Fire Tracker
        </Link>
        <Link to="/community" onClick={closeMenu}>
          Community Posts
        </Link>
        <Link to="/fundraiser" onClick={closeMenu}>
          Fundraisers & Events
        </Link>

        {isLoggedIn ? (
          <div className="profile-icon" onClick={handleProfileToggle} ref={profileRef}>
            <FontAwesomeIcon icon={faUser} />
            {showProfileToggle && (
              <div className="profile-dropdown">
                <Link
                  to="/profile"
                  onClick={() => {
                    closeMenu();
                    setProfileToggle(false);
                  }}
                >
                  My Profile
                </Link>
                <Link
                  to="/my-posts"
                  onClick={() => {
                    closeMenu();
                    setProfileToggle(false);
                  }}
                >
                  My Posts
                </Link>
                <button className="sign-out-btn" onClick={handleSignOut}>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="get-started-btn" onClick={closeMenu}>
            Get Started
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;