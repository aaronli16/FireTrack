// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7PYG8ZtnOKZGIl_-EXilXcmhX95VabrQ",
  authDomain: "firetrack-80309.firebaseapp.com",
  projectId: "firetrack-80309",
  storageBucket: "firetrack-80309.firebasestorage.app",
  databaseURL: "https://firetrack-80309-default-rtdb.firebaseio.com/",
  messagingSenderId: "990391602830",
  appId: "1:990391602830:web:aeb5f9903c63fa268903df"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const sharedImageStorage = getStorage(app, "gs://info340-storage.firebasestorage.app");

export default firebaseConfig;