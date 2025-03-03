import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, MapPin } from 'lucide-react';
import './styles/signup.css';
import fireIcon from '../img/fireicon.png'
const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    // used chat to figure out show password functionality
  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-card">
          <div className="signup-card-left">
            
            <div className="overlay">
              <h2>Join FireTrack Today</h2>
              <p>Create an account to receive real-time wildfire alerts and help keep your community safe.</p>
            </div>
          </div>
          <div className="signup-card-right">
            <div className="signup-header">
              <div className="signup-logo">
                <img src={fireIcon} alt="FireTrack Logo" />
              </div>
              <h1>Create Account</h1>
              <p>Track Wildfires in Your Area</p>
            </div>

            <form className="signup-form">
              <div className="form-group">
                <label htmlFor="fullname">Full Name</label>
                <div className="input-wrapper">
                  <User size={18} className="input-icon" />
                  <input
                    id="fullname"
                    type="text"
                    name="fullname"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-wrapper">
                  <Mail size={18} className="input-icon" />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="input-wrapper">
                    <Lock size={18} className="input-icon" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Create password"
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="input-wrapper">
                    <Lock size={18} className="input-icon" />
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="zipcode">Zip Code (Optional)</label>
                <div className="input-wrapper">
                  <MapPin size={18} className="input-icon" />
                  <input
                    id="zipcode"
                    type="text"
                    name="zipcode"
                    placeholder="Enter your zip code for local alerts"
                  />
                </div>
              </div>

              <div className="terms-checkbox">
                <input type="checkbox" id="terms" />
                <label htmlFor="terms">
                  I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link> {/* add terms of srvices and private policy later, make like a random pdf*/}
                </label>
              </div>
            
              <button
                type="button"
                className="signup-button"
              >
                Create Account
              </button>

              <div className="login-prompt">
                Already have an account? <Link to="/login">Sign in</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;