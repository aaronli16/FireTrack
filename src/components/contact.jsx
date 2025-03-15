import React, { useState } from 'react';
import './styles/styles.css';

export function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    
    const [submitted, setSubmitted] = useState(false);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
       
        console.log('Form submitted:', formData);
        setSubmitted(true);
        
        setTimeout(() => {
            setFormData({ name: '', email: '', message: '' });
            setSubmitted(false);
        }, 3000);
    };
    
    return (
        <div className="contact-container">
            <div className="contact-card">
                <header className="contact-header">
                    <h1 className="contact-title">Contact Us</h1>
                    <p className="contact-subtitle">
                        Have questions about FireTrack? Send us a message and we'll get back to you as soon as possible.
                    </p>
                </header>
                
                {submitted ? (
                    <div className="success-message">
                        <div className="success-icon">✓</div>
                        <h2>Thank You!</h2>
                        <p>Your message has been sent successfully. We'll respond shortly.</p>
                    </div>
                ) : (
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <div className="input-wrapper">
                                <span className="input-icon">👤</span>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <div className="input-wrapper">
                                <span className="input-icon">✉️</span>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea 
                                id="message" 
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="How can we help you?"
                                rows="5"
                                required
                            ></textarea>
                        </div>
                        
                        <button type="submit" className="contact-button">
                            Send Message
                        </button>
                    </form>
                )}
                
                <div className="contact-info">
                    <div className="contact-info-item">
                        <div className="contact-icon">📞</div>
                        <div>
                            <h3>Call Us</h3>
                            <p>(123) 456-7890</p>
                        </div>
                    </div>
                    
                    <div className="contact-info-item">
                        <div className="contact-icon">✉️</div>
                        <div>
                            <h3>Email</h3>
                            <p>support@firetrack.com</p>
                        </div>
                    </div>
                    
                    <div className="contact-info-item">
                        <div className="contact-icon">🏢</div>
                        <div>
                            <h3>Office</h3>
                            <p>University of Washington<br />Seattle, WA 98015</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}