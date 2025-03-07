import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { app } from './firebase.js';  // Import from firebase.js, not firebaseConfig

createRoot(document.getElementById('root')).render(
  <App />
)