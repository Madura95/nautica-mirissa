// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaWNf7QYKj3WvbGaEkAq2MQJ1zi-tPL4g",
  authDomain: "nautica-mirissa.firebaseapp.com",
  projectId: "nautica-mirissa",
  storageBucket: "nautica-mirissa.appspot.com",
  messagingSenderId: "177180729638",
  appId: "1:177180729638:web:f2c33175fe34f7d39e61e7",
  measurementId: "G-42NKMQ8BEG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);

export { firestore };
export const auth = getAuth(app);