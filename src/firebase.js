import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqCZPvpxjoTvxiW7ez9dKGzW59GcKa3hE",
  authDomain: "resort-booking-7846c.firebaseapp.com",
  projectId: "resort-booking-7846c",
  storageBucket: "resort-booking-7846c.firebasestorage.app",
  messagingSenderId: "646006769564",
  appId: "1:646006769564:web:be7fa8c192b89455c5ea59"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth