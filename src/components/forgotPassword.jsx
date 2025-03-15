import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import './styles/forgotPassword.css';
import fireIcon from '../../public/img/fireicon.png';
import { sendPasswordResetEmail } from 'firebase/auth';
import {auth} from '../firebase';


const ForgotPasswordPage = () => {
  const fireTrackLogo = "../../img/FireTrack_Logo.png";
  const [email, setEmail] = useState(''); // State to store email input
  const [error, setError] = useState(''); // State to store error messages
  const [success, setSuccess] = useState(false); // State to indicate if email was sent
  const [loading, setLoading] = useState(false); // State to manage loading state

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    setLoading(true);
    setError('');
    

    // Chatgpt helped with implementing sending password reset 
    try {
      
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
    } catch (error) {
      console.error('Error sending password reset:', error);
      let errorMessage = 'Failed to send reset email. Please try again.';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address format.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <div className="forgot-password-card">
          <div className="forgot-password-card-left">
            <div className="overlay">
              <h2>Password Reset</h2>
              <p>We'll send you instructions to reset your password and get you back to monitoring wildfires in your area.</p>
            </div>
          </div>
          <div className="forgot-password-card-right">
            <div className="forgot-password-header">
              <div className="forgot-password-logo">
                <img src={fireTrackLogo} alt = "Fire Track Logo"/>
              </div>
              <h1>Forgot Password?</h1>
              <p>Enter your email to receive a reset link</p>
            </div>

            {success ? (
              <div className="success-container">
                <div className="success-icon">
                  <CheckCircle size={60} color="#4CAF50" />
                </div>
                <h2>Email Sent!</h2>
                <p>Check your inbox for instructions to reset your password.</p>
                <p className="email-sent">{email}</p>
                <div className="back-to-login">
                  <Link to="/login" className="back-link">
                    <ArrowLeft size={16} />
                    <span>Return to Login</span>
                  </Link>
                </div>
              </div>
            ) : (
              <form className="forgot-password-form" onSubmit={handleResetPassword}>
                {error && <div className="error-message">{error}</div>}
                
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <div className="input-wrapper">
                    <Mail size={18} className="input-icon" />
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="reset-button"
                  disabled={loading}
                >
                  {loading ? <span className="spinner"></span> : null}
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;