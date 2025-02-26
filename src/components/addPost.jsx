import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const AddPost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: new Date().toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    }), // Set today's date automatically
  });
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Post:', formData);
    const postToAdd = { ...formData }; // Capture the data before resetting
    setFormData({
      title: '',
      content: '',
      date: new Date().toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
      }), // Reset with today's date
    });
    setSubmitted(true);
    setTimeout(() => {
      navigate('/community', { state: { newPost: postToAdd } });
    }, 1000);
  };

  return (
    <div className="app-container">
      <main className="main-content" role="main">
        <h1>Add a New Post</h1>

        <div className="container">
          {(() => {
            if (submitted) {
              return (
                <p className="success-message">
                  Post submitted successfully! Redirecting to Community Blog...
                </p>
              );
            } else {
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
          })()}
        </div>
      </main>
    </div>
  );
};

export default AddPost;