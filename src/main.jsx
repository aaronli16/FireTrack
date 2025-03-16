import React from 'react'
import { createRoot } from 'react-dom/client'

import './components/styles/styles.css';
import App from './App.jsx'
import { app } from './firebase.js';  

createRoot(document.getElementById('root')).render(
  <App />
)