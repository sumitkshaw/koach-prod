import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

// // firebase.js - TEMPORARY VERSION (No Firebase needed)
// // This file provides dummy exports so components don't crash

// console.log("🔥 Using temporary Firebase (no real Firebase connection)");

// // Dummy auth object
// export const auth = {
//   currentUser: null,
//   signOut: () => Promise.resolve(),
//   signInWithEmailAndPassword: () => Promise.resolve(),
//   createUserWithEmailAndPassword: () => Promise.resolve()
// };

// // Dummy Google Auth provider
// export const provider = {
//   addScope: () => {},
//   setCustomParameters: () => {}
// };

// // Default export (in case something imports the whole module)
// export default {
//   auth,
//   provider
// };