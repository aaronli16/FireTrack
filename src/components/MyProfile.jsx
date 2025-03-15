import React, { useState } from 'react';
import './styles/MyProfile.css';
import { auth } from '../firebase';


// MyProfile component
function MyProfile() {
    const user = auth.currentUser;

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
                            <p>Not set</p>
                        </div>
                    </div>
                </section>

                {/* Safety Preferences Section */}
                <section className="profile-section">
                    <h2>Safety Preferences</h2>
                    <div className="preferences-grid">
                        <div className="preference-item">
                            <label>Alert Radius</label>
                            <select defaultValue="10">
                                <option value="5">5 miles</option>
                                <option value="10">10 miles</option>
                                <option value="20">20 miles</option>
                                <option value="50">50 miles</option>
                            </select>
                        </div>
                        <div className="preference-item">
                            <label>Notification Method</label>
                            <div className="checkbox-group">
                                <label>
                                    <input type="checkbox" defaultChecked /> Email
                                </label>
                                <label>
                                    <input type="checkbox" defaultChecked /> Push Notifications
                                </label>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Community Activity Section */}
                <section className="profile-section">
                    <h2>Community Activity</h2>
                    <div className="activity-stats">
                        <div className="stat-item">
                            <span className="stat-number">0</span>
                            <span className="stat-label">Fire Reports</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">0</span>
                            <span className="stat-label">Community Posts</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">0</span>
                            <span className="stat-label">Comments</span>
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
                    ></textarea>
                </section>

                {/* Emergency Contact Section */}
                <section className="profile-section">
                    <h2>Emergency Contact Information</h2>
                    <div className="emergency-contact">
                        <div className="contact-item">
                            <label>Emergency Contact Name</label>
                            <input type="text" placeholder="Enter name" />
                        </div>
                        <div className="contact-item">
                            <label>Emergency Contact Number</label>
                            <input type="tel" placeholder="Enter phone number" />
                        </div>
                        <div className="contact-item">
                            <label>Local Fire Department</label>
                            <input type="text" placeholder="Enter local fire department" />
                        </div>
                    </div>
                </section>
            </div>

            <div className="profile-actions">
                <button className="save-button">Save Changes</button>
                <button className="delete-account">Delete Account</button>
            </div>
        </div>
    );
}

export default MyProfile; 