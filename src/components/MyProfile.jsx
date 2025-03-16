import React, { useState, useEffect } from 'react';
import './styles/styles.css';
import { auth } from '../firebase';
import { ref, set as firebaseSet, get as fireBaseGet } from 'firebase/database';
import { db } from '../firebase';
import { saveUser } from '../services/userServices';

function MyProfile() {
    const user = auth.currentUser;
    const [about, setAbout] = useState('');
    const [location, setLocation] = useState('');

    useEffect(function() {
        if (user) {
          const userProfileRef = ref(db, `userProfiles/${user.uid}`);
          fireBaseGet(userProfileRef).then(function(snapshot) {
            if (snapshot.exists()) {
              const data = snapshot.val();
              if (data.about) setAbout(data.about);
              if (data.location) setLocation(data.location);
            }
          }).catch(function(error) {
            console.error("Error loading profile data:", error);
          });
        }
      }, []);
      
      function handleSave() {
        if (user) {
          saveUser(user).then(function() {
            const userProfileRef = ref(db, `userProfiles/${user.uid}`);
            return firebaseSet(userProfileRef, {
              about,
              location,
            });
          })
          .then(function() {
            alert('Profile saved successfully!');
          })
          .catch(function(error) {
            console.error('Error saving profile:', error);
            alert('Failed to save profile. Please try again.');
          });
        }
      }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-avatar">
                    {user?.photoURL ? (
                        <img src={user.photoURL} alt="Profile" />
                    ) : (
                        <div className="avatar-placeholder">
                            {user?.displayName?.charAt(0) || user?.email?.charAt(0) || '?'}
                        </div>
                    )}
                </div>
                <h1>{user?.displayName || 'User'}</h1>
                <p className="join-date">Member since: {user?.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'Unknown'}</p>
            </div>

            <div className="profile-sections">
                {/* Basic Information Section */}
                <section className="profile-section">
                    <h2>Basic Information</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <label>Display Name</label>
                            <p>{user?.displayName || 'Not set'}</p>
                        </div>
                        <div className="info-item">
                            <label>Email</label>
                            <p>{user?.email}</p>
                        </div>
                        <div className="info-item">
                            <label>Location</label>
                            <input 
                                type="text" 
                                value={location} 
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="Enter your location" 
                            />
                        </div>
                    </div>
                </section>

                {/* About Me Section */}
                <section className="profile-section">
                    <h2>About Me</h2>
                    <textarea
                        className="about-me"
                        placeholder="Tell us about yourself..."
                        rows="4"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                    ></textarea>
                </section>
            </div>

            <div className="profile-actions">
                <button className="save-button" onClick={handleSave}>Save Changes</button>
            </div>
        </div>
    );
}

export default MyProfile;