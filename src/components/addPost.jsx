import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/addPost.css';

function AddPost() {
  // State to store form data (title, content, date)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: new Date().toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    }), // Automatically set today's date
  });
  
  // State to track if form was submitted
  const [submitted, setSubmitted] = useState(false);

  // Get the navigate function from react-router
  const navigate = useNavigate();

  // Handle input changes in the form
  function handleChange(event) {
    // Get the name and value from the input field
    const inputName = event.target.name;
    const inputValue = event.target.value;
    
    // Update the form data with the new value
    setFormData(function(previousFormData) {
      return {
        ...previousFormData,
        [inputName]: inputValue
      };
    });
  }

  // Handle form submission
  function handleSubmit(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    
    // Save the current form data before resetting the form
    const postToAdd = { ...formData };
    
    // Reset the form fields
    setFormData({
      title: '',
      content: '',
      date: new Date().toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      }),
    });
    
    // Show the success message
    setSubmitted(true);
    
    // After 1 second, navigate to the community page and pass the new post data
    setTimeout(function() {
      navigate('/community', { state: { newPost: postToAdd } });
    }, 1000);
  }

  // Render content based on submission status
  function renderContent() {
    // If the form has been submitted
    if (submitted) {
      return (
        <p className="success-message">
          Post submitted successfully! Redirecting to Community Blog...
        </p>
      );
    } 
    // If the form has not been submitted
    else {
      return (
        <form className="post-form" onSubmit={handleSubmit}>
          {/* Title input field */}
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
            />
          </div>

          {/* Content input field */}
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
            />
          </div>

          {/* Submit button */}
          <div className="submit-btn-wrapper">
            <button type="submit" className="submit-btn">
              Submit Post
            </button>
          </div>
        </form>
      );
    }
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