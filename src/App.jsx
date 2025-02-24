import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import FireRiskPage from './components/fireTracker.jsx';
import CommunityPage from './components/communityBlog.jsx';
import FundraiserPage from './components/fundraiser.jsx';
import HomePage from './components/home.jsx';
import Footer from './components/footer.jsx';

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/fire-risk" element={<FireRiskPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/fundraiser" element={<FundraiserPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App
