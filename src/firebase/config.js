import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
//database from firebase
import { getFirestore } from "firebase/firestore";

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
const db = getFirestore(firebaseApp);
const Auth = getAuth(firebaseApp);
// const timestamp = projectFirestore.FieldValue.serverTimestamp;

export { projectStorage, Auth, firebaseApp, db };

// export const createUserDocument = async (user, addNewData) => {
//   if (!user) return;

//   const userRef = projectFirestore.doc(`users/${user.uid}`);
//   const snapshot = await userRef.get();

//   if (!snapshot.exists) {
//     const { email } = user;
//     const { username } = addNewData;
//     try {
//       await userRef.set({
//         username,
//         email,
//         createdAt: new Date(),
//       });
//     } catch (error) {
//       console.log("Inscription non réussie", error);
//     }
//   }
// };
