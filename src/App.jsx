import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import FireRiskPage from './components/fireTracker.jsx';
import CommunityBlog from './components/communityBlog.jsx';
import FundraiserPage from './components/fundraiser.jsx';
import HomePage from './components/home.jsx';
import Footer from './components/footer.jsx';
import AddPost from './components/addPost.jsx';
import LoginPage from './components/login.jsx';
import SignUpPage from './components/signup.jsx';
import ForgotPasswordPage from './components/forgotPassword.jsx';
import AddReport from './components/addReport.jsx';
import { onAuthStateChanged, getAuth } from 'firebase/auth';


function App() {
  
  const [reportedFires, setReportedFires] = useState([]);

  const [currentUser, setCurrentUser] = useState();
  

  useEffect(() => {

    const auth = getAuth();
    onAuthStateChanged(auth, (firebaseUserObj) =>{

      if (firebaseUserObj != null) {
         console.log("auth state change");
         console.log(firebaseUserObj);
         firebaseUserObj.userId = firebaseUserObj.uid;
         firebaseUserObj.userName = firebaseUserObj.displayName;
         setCurrentUser(firebaseUserObj);
      }
      else  {
        setCurrentUser(null);
      }
      
      
    })
  }, [])
 // chance to firebase db later when initiailized
  useEffect(() => {
    const savedFires = localStorage.getItem('reportedFires');
    if (savedFires) {
      const parsedFires = JSON.parse(savedFires);
      setReportedFires(parsedFires);
    }
  }, []);
  
  
  useEffect(() => {
    if (reportedFires.length > 0) {
      localStorage.setItem('reportedFires', JSON.stringify(reportedFires));
    }
  }, [reportedFires]);

  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/fire-risk" 
              element={
                <FireRiskPage 
                  reportedFires={reportedFires} 
                  setReportedFires={setReportedFires} 
                />
              } 
            />
            <Route path="/community" element={<CommunityBlog />} />
            <Route path="/fundraiser" element={<FundraiserPage />} />
            <Route path="/add-post" element={<AddPost />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage/>}/>
            <Route path="/forgotPassword" element={<ForgotPasswordPage/>}/>
            <Route 
              path="/addReport" 
              element={
                <AddReport 
                  reportedFires={reportedFires}
                  setReportedFires={setReportedFires}
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;