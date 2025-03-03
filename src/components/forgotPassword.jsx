import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import './styles/forgotPassword.css';
import fireIcon from '../img/fireicon.png'

const ForgotPasswordPage = () => {
  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <div className="forgot-password-card">
          <div className="forgot-password-card-left">
            <div className="fire-bg"></div>
            <div className="overlay">
              <h2>Password Reset</h2>
              <p>We'll send you instructions to reset your password and get you back to monitoring wildfires in your area.</p>
            </div>
          </div>
          <div className="forgot-password-card-right">
            <div className="forgot-password-header">
              <div className="forgot-password-logo">
                <img src={fireIcon} alt="FireTrack Logo" />
              </div>
              <h1>Forgot Password?</h1>
              <p>Enter your email to receive a reset link</p>
            </div>

            <form className="forgot-password-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrapper">
                  <Mail size={18} className="input-icon" />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <button
                type="button"
                className="reset-button"
              >
                Send Reset Link
              </button>

              <div className="back-to-login">
                <Link to="/login" className="back-link">
                  <ArrowLeft size={16} />
                  <span>Back to Login</span>
                </Link>
              </div>
              
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

export default ForgotPasswordPage;