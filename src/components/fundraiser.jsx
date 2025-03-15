import React, { useState } from 'react';
import './styles/fundraiser.css';

function FundraiserPage() {
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
  const [fundraisers, setFundraisers] = useState([ // State to store fundraisers
    //Fake fundraisers so the users have something to look at
    {
      name: 'California Wildfire Relief Effort',
      organization: 'Greater Good',
      description: 'Help support families affected by recent wildfires. Every donation makes a difference.',
      link: 'https://greatergood.org/disaster-relief/california-wildfires',
      image: 'img/wildfire.jpg'
    },
    {
      name: 'Firefighter Support Fund',
      organization: 'NVFC',
      description: 'Support our brave firefighters with essential resources and medical aid.',
      link: 'https://www.nvfc.org/nvfc-volunteer-firefighter-support-fund/',
      image: 'img/firefighter.jpg'
    },
    {
      name: 'Rebuilding Forests',
      organization: 'Plant with Purpose',
      description: 'Help replant trees and restore natural habitats affected by wildfires.',
      link: 'https://plantwithpurpose.org/reforestation/',
      image: 'img/forest.jpg'
    }
  ]);
  
  const [newFundraiser, setNewFundraiser] = useState({ // State to store new fundraiser details
    name: '',
    organization: '',
    description: '',
    link: '',
    image: null
  });

  function togglePopup() { // Function to toggle the visibility of the popup
    setShowPopup(!showPopup);
  }
 
  function handleInputChange(event) { // Function to handle input changes in the form
    const { name, value } = event.target;
    setNewFundraiser({ ...newFundraiser, [name]: value });
  }

  function handleImageUpload(event) { // Function to handle image upload
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = function() {
        setNewFundraiser({ ...newFundraiser, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  function handleSubmit(event) { // Function to handle form submission
    event.preventDefault();
    if (!newFundraiser.name || !newFundraiser.organization || !newFundraiser.description || !newFundraiser.link) {
      alert('Please fill in all fields.');
      return;
    }
    setFundraisers([...fundraisers, { ...newFundraiser, image: newFundraiser.image || 'img/default.jpg' }]);
    setNewFundraiser({ name: '', organization: '', description: '', link: '', image: null });
    togglePopup();
  }

  return (
    <div className="fundraiser-page">
      <h1>Fundraisers</h1>
      <div className="suggest-btn-container">
        <button className="suggest-btn" onClick={togglePopup}>Suggest a Fundraiser</button>
      </div>
      
      <div className="fundraiser-container">
        {fundraisers.map(function(fundraiser, index) {
          return (
            <div className="fundraiser-card" key={index}>
              <img src={fundraiser.image} alt={fundraiser.name} />
              <div className="card-content">
                <h3>{fundraiser.name}</h3>
                <p><strong>{fundraiser.organization}</strong></p>
                <p>{fundraiser.description}</p>
                <a href={fundraiser.link} className="donate-btn" target="_blank" rel="noopener noreferrer">Donate</a>
              </div>
            </div>
          );
        })}
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Suggest a Fundraiser</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Fundraiser Name" value={newFundraiser.name} onChange={handleInputChange} required />
              <input type="text" name="organization" placeholder="Organization" value={newFundraiser.organization} onChange={handleInputChange} required />
              <textarea name="description" placeholder="Description" value={newFundraiser.description} onChange={handleInputChange} required />
              <input type="url" name="link" placeholder="External Website Link" value={newFundraiser.link} onChange={handleInputChange} required />
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              {newFundraiser.image && <img src={newFundraiser.image} alt="Preview" className="image-preview" />}
              <button type="submit" className="submit-btn">Submit</button>
              <button type="button" className="close-btn" onClick={togglePopup}>Close</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default FundraiserPage;
