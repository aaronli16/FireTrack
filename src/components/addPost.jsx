import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './styles/styles.css';
import { getDatabase, ref, push, set } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


// AddPost component
function AddPost() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: new Date().toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    }),
  });
  
  const [submitted, setSubmitted] = useState(false); // State to track if the form has been submitted
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track if the form is being submitted
  const [user, setUser] = useState(null); // State to store the current user
  const [loading, setLoading] = useState(true); // State to manage loading state

  const navigate = useNavigate(); // Hook to programmatically navigate between routes
  const db = getDatabase(); // Initialize Firebase Realtime Database
  const auth = getAuth(); // Initialize Firebase Authentication

  useEffect(() => { // Effect to set up authentication state listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  function handleChange(event) { // Function to handle input changes
    const inputName = event.target.name;
    const inputValue = event.target.value;
    
    setFormData(function(previousFormData) {
      return {
        ...previousFormData,
        [inputName]: inputValue
      };
    });
  }

  function handleSubmit(event) { // Function to handle form submission
    event.preventDefault();
    
    if (!user) {
      navigate('/login');
      return;
    }
    
    setIsSubmitting(true);
    
    let authorName = 'Anonymous';
    if (user.displayName) {
      authorName = user.displayName;
    }
    
    const postToAdd = {  // Object to store the new post details
      ...formData,
      authorId: user.uid,
      authorName: authorName,
      authorEmail: user.email,
      createdAt: new Date().toISOString()
    };
    
    const postsRef = ref(db, 'posts'); // Reference to the posts node in the database
    const newPostRef = push(postsRef); // Create a new reference for the post
    
    set(newPostRef, postToAdd)
      .then(() => {
        setFormData({
          title: '',
          content: '',
          date: new Date().toLocaleDateString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
          }),
        });
        
        setSubmitted(true);
        setIsSubmitting(false);
        
        setTimeout(function() {
          navigate('/community', { state: { newPost: postToAdd } });
        }, 1000);
      })
      .catch(error => {
        console.error("Error adding post to Firebase:", error);
        alert("An error occurred while saving your post. Please try again.");
        setIsSubmitting(false);
      });
  }

  function renderContent() { // Function to render different content based on the state
    if (loading) {
      return (
        <div className="loading-message">
          <p>Loading...</p>
        </div>
      );
    }
    
    if (!user) {
      return (
        <div className="login-required-message">
          <p>You must be logged in to add a post.</p>
          <div className="login-options">
            <Link to="/login" className="login-link">Sign In</Link>
            <span className="login-separator"> or </span>
            <Link to="/signup" className="signup-link">Create Account</Link>
          </div>
        </div>
      );
    }
    
    if (submitted) {
      return (
        <p className="success-message">
          Post submitted successfully! Redirecting to Community Blog...
        </p>
      );
    } 
    
    return (
      <form className="post-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="post-title">Post Title</label>
          <input
            type="text"
            name="title"
            id="post-title"
            className="form-input"
            placeholder="Enter post title"
            value={formData.title}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="post-content">Post Content</label>
          <textarea
            name="content"
            id="post-content"
            className="form-input"
            placeholder="Write your post content here"
            rows="6"
            value={formData.content}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="submit-btn-wrapper">
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting && 'Submitting...'}
            {!isSubmitting && 'Submit Post'}
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="app-container">
      <main className="main-content" role="main">
        <h1>Add a New Post</h1>

        <div className="container">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default AddPost;