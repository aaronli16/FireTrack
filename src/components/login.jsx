import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import './styles/styles.css';
import { StyledFirebaseAuth } from 'react-firebaseui';
import {  EmailAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../firebase';
const LoginPage = () => {
  const fireTrackLogo = "../../img/FireTrack_Logo.png"; 
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [email, setEmail] = useState(''); // State to store email input
  const [password, setPassword] = useState(''); // State to store password input
  const [error, setError] = useState(''); // State to store error messages
  const [loading, setLoading] = useState(false);// State to manage loading state
  
  const navigate = useNavigate(); // Hook to programmatically navigate between routes

  // FirebaseUI configuration
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

// Function to handle sign-in
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      console.error('Error signing in:', error);
      let errorMessage = 'Failed to sign in. Please try again.';
      
      if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid email or password.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
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
              <img src={fireTrackLogo} alt="FireTrack Logo" />
              </div>
             
              
            </div>

            <form className="login-form" onSubmit={handleSignIn}>
              {error && <div className="error-message">{error}</div>}
              
              <div className="form-group compact">
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

              <div className="form-group compact">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <div className="form-options compact">
                <Link to="/forgotPassword" className="forgot-link">Forgot password?</Link>
              </div>

              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >
                {loading ? <span className="spinner"></span> : null}
                Sign In 
              </button>
              
              <div className="or-divider compact">
                <span>OR</span>
              </div>
              
              
              <div className="firebase-auth-container">
                <StyledFirebaseAuth 
                  uiConfig={firebaseUIConfig}
                  firebaseAuth={auth}
                />
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


export default LoginPage;