import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import './styles/login.css';
import fireIcon from '../img/fireicon.png'


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  // Used Chatgpt to figure out show password. 
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-card-left">
           
            <div className="overlay">
              <h2>Welcome to FireTrack</h2>
              <p>Stay informed about wildfires in your area and keep your community safe.</p>
            </div>
          </div>
          <div className="login-card-right">
            <div className="login-header">
              <div className="login-logo">
                <img src={fireIcon} alt="FireTrack Logo" />
              </div>
              <h1>FireTrack</h1>
              <p>Track Wildfires in Your Area</p>
            </div>

            <form className="login-form">
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

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
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

              <div className="form-options">
                
                <Link to="/forgotPassword" className="forgot-link">Forgot password?</Link>
              </div>

              <button
                type="button"
                className="login-button"
              >
                Sign In
              </button>

              <div className="signup-prompt">
                Don't have an account? <Link to="/signup">Sign up</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;