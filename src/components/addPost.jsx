import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/addPost.css';

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
  
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  function handleChange(event) {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    
    setFormData(function(previousFormData) {
      return {
        ...previousFormData,
        [inputName]: inputValue
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    const postToAdd = { ...formData };
    
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
    
    setTimeout(function() {
      navigate('/community', { state: { newPost: postToAdd } });
    }, 1000);
  }

  function renderContent() {
    if (submitted) {
      return (
        <p className="success-message">
          Post submitted successfully! Redirecting to Community Blog...
        </p>
      );
    } 
    else {
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
            />
          </div>

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