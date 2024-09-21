// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzIIW1yf4W0dqYU5VBCoQNIQy2aHQ1NQs",
  authDomain: "community-d6587.firebaseapp.com",
  projectId: "community-d6587",
  storageBucket: "community-d6587.appspot.com",
  messagingSenderId: "260242170250",
  appId: "1:260242170250:web:d09c17a90e73da03b2a873",
  measurementId: "G-4M0PC7HVG3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, db };
