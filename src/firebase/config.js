import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
//database from firebase
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import firebase from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const projectStorage = getStorage(firebaseApp);
const projectFirestore = getFirestore(firebaseApp);
const Auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);
// const timestamp = projectFirestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, Auth, firebaseApp, db };
