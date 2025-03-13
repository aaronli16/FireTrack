// firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import firebaseConfig from './firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export  {app, db, auth};