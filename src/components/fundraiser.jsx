import React, { useState, useEffect } from 'react';
import { ref as dbRef, set, push, onValue } from "firebase/database";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, sharedImageStorage } from "../firebaseConfig";
import './styles/styles.css';

function FundraiserPage() {
    const [showPopup, setShowPopup] = useState(false);

    const defaultFundraisers = [
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
    ];

    const [fundraisers, setFundraisers] = useState(defaultFundraisers);

    const [newFundraiser, setNewFundraiser] = useState({
        name: '',
        organization: '',
        description: '',
        link: '',
        image: null
    });

    useEffect(function() {
        const fundraisersRef = dbRef(db, "fundraisers");

        onValue(fundraisersRef, function(snapshot) {
            const data = snapshot.val();
            if (data) {
                const fundraiserList = Object.values(data);
                setFundraisers([...defaultFundraisers, ...fundraiserList]);
            }
        });
    }, []);

    function togglePopup() {
        setShowPopup(!showPopup);
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setNewFundraiser({ ...newFundraiser, [name]: value });
    }

    function handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) {
            console.log("No file selected.");
            return;
        }
    
        setNewFundraiser(function(prev) {
            return { ...prev, image: file };
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
    
        if (!newFundraiser.name || !newFundraiser.organization || !newFundraiser.description || !newFundraiser.link) {
            alert("Please fill in all fields.");
            return;
        }
    
        const fundraisersRef = dbRef(db, "fundraisers");
        const newFundraiserRef = push(fundraisersRef);
    
        if (newFundraiser.image instanceof File) {
            const imageRef = ref(sharedImageStorage, "GroupCB2/userImages/" + newFundraiser.image.name);
    
            uploadBytes(imageRef, newFundraiser.image).then(function(snapshot) {
                console.log("Image uploaded successfully:", newFundraiser.image.name);
    
                getDownloadURL(imageRef).then(function(imageUrl) {
                    console.log("Image URL:", imageUrl);
    
                    set(newFundraiserRef, {
                        name: newFundraiser.name,
                        organization: newFundraiser.organization,
                        description: newFundraiser.description,
                        link: newFundraiser.link,
                        image: imageUrl
                    });
    
                    setNewFundraiser({
                        name: "",
                        organization: "",
                        description: "",
                        link: "",
                        image: null
                    });
    
                    togglePopup();
                });
    
            }).catch(function(error) {
                console.log("Error uploading image:", error);
            });
        } else {
            set(newFundraiserRef, {
                name: newFundraiser.name,
                organization: newFundraiser.organization,
                description: newFundraiser.description,
                link: newFundraiser.link,
                image: "img/default.jpg"
            });
    
            setNewFundraiser({
                name: "",
                organization: "",
                description: "",
                link: "",
                image: null
            });
    
            togglePopup();
        }
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
                            <img src={fundraiser.image || "img/default.jpg"} alt={fundraiser.name} />
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
                            {newFundraiser.image && newFundraiser.image instanceof File && <img src={URL.createObjectURL(newFundraiser.image)} alt="Preview" className="image-preview" />}
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
