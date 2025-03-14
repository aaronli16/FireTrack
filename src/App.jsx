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
//import MyProfile from './components/MyProfile.jsx';
import MyPosts from './components/MyPosts.jsx';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase.js';
import { getDatabase, ref, set as firebaseSet } from 'firebase/database';
import { saveUser } from './services/userServices.js';
import { fetchFireReports } from './services/fireReportServices.js';

function App() {

  const [reportedFires, setReportedFires] = useState([]);

  const [currentUser, setCurrentUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);



  console.log(db);
  const userRef = ref(db, "users");
  const fireReportsRef = ref(db, "fireReports");
  const communityPostsRef = ref(db, "communityPosts");
  const fundraiserPosts = ref(db, 'fundraiserPosts');
  const locationsRef = ref(db, "locations");
  const activeFiresRef = ref(db, "activeFireReports");
  const userReportsRef = ref(db, "userReports");


  console.log(userRef);





  useEffect(() => {


    onAuthStateChanged(auth, (firebaseUserObj) => {

      if (firebaseUserObj != null) {
        saveUser(firebaseUserObj)
          .then(function () {
            console.log("User profile saved/updated in database");
          })
          .catch(function (error) {
            console.log("Error:", error);
          });
        console.log("auth state change");
        console.log(firebaseUserObj);
        firebaseUserObj.userId = firebaseUserObj.uid;
        firebaseUserObj.userName = firebaseUserObj.displayName;
        setCurrentUser(firebaseUserObj);
        setIsLoggedIn(true);

      }
      else {
        setCurrentUser(null);
        setIsLoggedIn(false);
      }


    })
  }, [])
  useEffect(() => {

    fetchFireReports()
      .then(function (fireReports) {
        setReportedFires(fireReports);
      })
      .catch(function (error) {
        console.log("Error fetching fire reports:", error);
      })

  }, []);



  return (
    <Router>
      <div className="app-container">
        <NavBar isLoggedIn={isLoggedIn} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/fire-risk"
              element={
                <FireRiskPage
                  reportedFires={reportedFires}
                  setReportedFires={setReportedFires}
                  currentUser={currentUser}
                />
              }
            />
            <Route path="/community" element={<CommunityBlog />} />
            <Route path="/fundraiser" element={<FundraiserPage />} />
            <Route path="/add-post" element={<AddPost />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
            {/*<Route path="/profile" element={<MyProfile />} />*/}
            <Route path="/my-posts" element={<MyPosts />} />
            <Route
              path="/addReport"
              element={
                <AddReport
                  reportedFires={reportedFires}
                  setReportedFires={setReportedFires}
                  currentUser={currentUser}
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