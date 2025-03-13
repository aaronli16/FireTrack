import React from 'react'
import { useState } from 'react';
import {ref, set as firebaseSet, push as firebasePush, get as fireBaseGet} from 'firebase/database';
import {db} from '../firebase.js';




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





