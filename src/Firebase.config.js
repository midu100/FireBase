// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAsskKRq4h6p_u4SC4Z2QFJs8isO-aR2os",
  authDomain: "note-bc3c2.firebaseapp.com",
  projectId: "note-bc3c2",
  storageBucket: "note-bc3c2.firebasestorage.app",
  messagingSenderId: "47037039845",
  appId: "1:47037039845:web:07b514b6be475dfd48000c",
  measurementId: "G-PYXQL3KK0Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app