import React, { useState } from 'react';
import './styles/styles.css';

import { saveFireReport } from '../services/fireReportServices.js';


// AddReport component
function AddReport({ isOpen, onClose, onSubmit, isLoading, reportedFires, setReportedFires }) {
  const [formData, setFormData] = useState({// State to store form data
    address: '',
    city: '',
    state: '',
    zipCode: '',
    severity: 'medium',
    status: 'active',
    description: ''
  });


  const [errors, setErrors] = useState({}); // State to store form validation errors

  const newReport = { // Object to store the new report data
    address: formData.address,
    city: formData.city,
    state: formData.state,
    zipCode: formData.zipCode,
    severity: formData.severity,
    status: formData.status,
    description: formData.description
  };




function handleChange (event) { // Function to handle input changes
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  function validateForm () { // Function to validate the form inputs
    const newErrors = {};
    
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function handleSubmit(event) { // Function to handle form submission
    event.preventDefault();
    
    if (validateForm()) {
      
      if (setReportedFires) {
       
        
        
        alert("Direct submission from this page is not implemented. Please use the 'Report a Fire' button from the Fire Risk page.");

        if (currentUser){
          saveFireReport(newReport, currentUser.uid)
          .then(function(reportId){
            newReport.reportId = reportId;
            setReportedFires([...reportedFires, newReport]);
            alert("Fire report submitted successfully!");
            onClose();
          })

          .catch(function(error){
            console.log("Error:", error);
          });
        }
      } else if (onSubmit) {
        
        onSubmit(formData);
      }
    }
  };

  // Early return for standalone route version
  if (reportedFires !== undefined && !isOpen) {
    return (
      <div className="standalone-form-container">
        <div className="modal-container">
          <div className="modal-header">
            <h2>Report a Fire</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="report-form">
            {/* Same form content as below */}
            {/* ... */}
          </form>
        </div>
      </div>
    );
  }

  // Early return for modal version when closed

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Report a Fire</h2>
          <button className="close-button" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="report-form">
          <div className="form-group">
            <label htmlFor="status">Report Type*</label>
            <div className="status-toggle">
              <button 
                type="button"
                className={`status-button ${formData.status === 'active' ? 'active' : ''}`}
                onClick={() => setFormData({...formData, status: 'active'})}
                disabled={isLoading}
              >
                <span className="status-icon fire-icon">🔥</span>
                Active Fire
              </button>
              <button 
                type="button"
                className={`status-button ${formData.status === 'cleared' ? 'active' : ''}`}
                onClick={() => setFormData({...formData, status: 'cleared'})}
                disabled={isLoading}
              >
                <span className="status-icon cleared-icon">✓</span>
                Fire Cleared
              </button>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="address">Street Address*</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={errors.address ? 'form-input error' : 'form-input'}
              placeholder="123 Main St"
              disabled={isLoading}
            />
            {errors.address && <span className="error-message">{errors.address}</span>}
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City*</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={errors.city ? 'form-input error' : 'form-input'}
                placeholder="City"
                disabled={isLoading}
              />
              {errors.city && <span className="error-message">{errors.city}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="state">State*</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={errors.state ? 'form-input error' : 'form-input'}
                placeholder="State"
                disabled={isLoading}
              />
              {errors.state && <span className="error-message">{errors.state}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="zipCode">ZIP Code</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="form-input"
                placeholder="ZIP"
                disabled={isLoading}
              />
            </div>
          </div>
          
          {formData.status === 'active' && (
            <div className="form-group">
              <label htmlFor="severity">Fire Severity*</label>
              <select
                id="severity"
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                className="form-input"
                disabled={isLoading}
              >
                <option value="low">Low - Small fire, under control</option>
                <option value="medium">Medium - Moderate fire, potential to spread</option>
                <option value="high">High - Large fire, actively spreading</option>
                <option value="critical">Critical - Immediate danger to life and property</option>
              </select>
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="description">Additional Information</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-input"
              placeholder={formData.status === 'active' 
                ? "Provide any additional details about the fire..." 
                : "Provide details about when/how the fire was cleared..."}
              rows="3"
              disabled={isLoading}
            ></textarea>
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose} disabled={isLoading}>
              Cancel
            </button>
            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner-small"></span>
                  Submitting...
                </>
              ) : (
                'Submit Report'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddReport;