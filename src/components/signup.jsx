import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, MapPin } from 'lucide-react';
import './styles/signup.css';
import fireIcon from '../../public/img/fireicon.png';
import { StyledFirebaseAuth } from 'react-firebaseui';
import {createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {auth} from '../firebase';



const SignUpPage = () => {
  const fireTrackLogo = "../../img/FireTrack_Logo.png";
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  
  const firebaseUIConfig = {
    signInOptions: [
      GoogleAuthProvider.PROVIDER_ID
    ],
    signInFlow: 'popup',
    credentialHelper: 'none',
    callbacks: {
      signInSuccessWithAuthResult: () => {
        navigate('/');
        return false;
      }
    }
  };
  
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    zipcode: '',
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
 
    if (!formData.fullname || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    if (!formData.agreeToTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
    
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      
      // Update the user profile with display name
      await updateProfile(userCredential.user, {
        displayName: formData.fullname
      });
      
      
      // Redirect to home page after successful signup
      navigate('/');
      
    } catch (error) {
      console.error('Error signing up:', error);
      let errorMessage = 'Failed to create account. Please try again.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email is already in use. Please use a different email or sign in.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email format.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Choose a stronger password.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  

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
                <img src={fireTrackLogo} alt ="Fire Track logo"/>
              </div>
              
              <p>Create Account</p>
            </div>

            <form className="signup-form" onSubmit={handleSignUp}>
              {error && <div className="error-message">{error}</div>}
              
              <div className="form-group">
                <label htmlFor="fullname">Full Name</label>
                <div className="input-wrapper">
                  <User size={18} className="input-icon" />
                  <input
                    id="fullname"
                    type="text"
                    name="fullname"
                    placeholder="Enter your full name"
                    value={formData.fullname}
                    onChange={handleChange}
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
                    value={formData.email}
                    onChange={handleChange}
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
                      value={formData.password}
                      onChange={handleChange}
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
                      value={formData.confirmPassword}
                      onChange={handleChange}
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
                    value={formData.zipcode}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="terms-checkbox">
                <input 
                  type="checkbox" 
                  id="agreeToTerms" 
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                />
                <label htmlFor="agreeToTerms">
                  I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
                </label>
              </div>
            
              <button
                type="submit"
                className="signup-button"
                disabled={loading}
              >
                {loading ? <span className="spinner"></span> : null}
                Create Account
              </button>
              
              <div className="or-divider">
                <span>OR</span>
              </div>
              
              <div className="firebase-auth-container">
                <StyledFirebaseAuth 
                  uiConfig={firebaseUIConfig}
                  firebaseAuth={auth}
                />
              </div>

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