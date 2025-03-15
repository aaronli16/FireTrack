import React from 'react'
import { ref, set as firebaseSet, push as firebasePush, get as fireBaseGet } from 'firebase/database';
import { db } from '../firebase.js';

// This function saves a user profile to the Firebase Realtime Database.
export function saveUser(user) {
    if (!user || !user.uid) {
        throw new Error("Invalid user object");
    }
    
    const userRef = ref(db, `users/${user.uid}`);
    return fireBaseGet(userRef).then(function(snapshot) {
        let userData = {};
        if (snapshot.exists()) {
            userData = snapshot.val();
            userData.lastLogin = new Date().getTime();
        } else {
            userData = {
                userId: user.uid,
                userName: user.displayName || "Anonymous User",
                email: user.email,
                profilePicture: user.photoURL || "",
                joinedDate: new Date().getTime(),
                lastLogin: new Date().getTime(),
            };
        }
        return firebaseSet(userRef, userData);
    });
}

// This function fetches a user's complete profile (combining basic and extended data)
export function getUserProfile(userId) {
    if (!userId) {
        throw new Error("Invalid user ID");
    }
    
    const userRef = ref(db, `users/${userId}`);
    const userProfileRef = ref(db, `userProfiles/${userId}`);
    
    return Promise.all([
        fireBaseGet(userRef),
        fireBaseGet(userProfileRef)
    ]).then(([userSnapshot, profileSnapshot]) => {
        const userData = userSnapshot.exists() ? userSnapshot.val() : {};
        const profileData = profileSnapshot.exists() ? profileSnapshot.val() : {};
        
        return {
            ...userData,
            ...profileData
        };
    });
}