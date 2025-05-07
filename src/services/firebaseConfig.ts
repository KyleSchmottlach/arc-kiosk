// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseOptions} from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "arc-kiosk.firebaseapp.com",
  projectId: "arc-kiosk",
  storageBucket: "arc-kiosk.firebasestorage.app",
  messagingSenderId: "163353964151",
  appId: "1:163353964151:web:689252a5fe16645e666072",
  measurementId: "G-E1HCGQKFE3",
  databaseURL: "https://arc-kiosk-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const analytics = getAnalytics(app);

export {app, database, analytics};