// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCp2CQLhetCYb6HYsqjYPm-7_G5IK2XEvw",
  authDomain: "ticket-bari-89e64.firebaseapp.com",
  projectId: "ticket-bari-89e64",
  storageBucket: "ticket-bari-89e64.firebasestorage.app",
  messagingSenderId: "862778280712",
  appId: "1:862778280712:web:d58af9957665b29c77fabd",
  measurementId: "G-MJE08NV5G8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);