import { initializeApp, FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Import the `getAuth` function

// Your web app's Firebase configuration
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyDt_h9sC53zfdSIHe4wGpJevMORa9gfLNQ",
  authDomain: "user-auth-8bb44.firebaseapp.com",
  projectId: "user-auth-8bb44",
  storageBucket: "user-auth-8bb44.appspot.com",
  messagingSenderId: "61811016072",
  appId: "1:61811016072:web:d8b8c17d4b3744024cfa3d",
  measurementId: "G-39FR1X7E31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
const auth = getAuth(app);

export { app, auth };
