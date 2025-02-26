import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import FireRiskPage from './components/fireTracker.jsx';
import CommunityBlog from './components/communityBlog.jsx'; // Updated to PascalCase
import FundraiserPage from './components/fundraiser.jsx';
import HomePage from './components/home.jsx';
import Footer from './components/footer.jsx';
import AddPost from './components/addPost.jsx';

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/fire-risk" element={<FireRiskPage />} />
            <Route path="/community" element={<CommunityBlog />} />
            <Route path="/fundraiser" element={<FundraiserPage />} />
            <Route path="/add-post" element={<AddPost />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;