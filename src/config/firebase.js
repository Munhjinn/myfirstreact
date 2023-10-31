
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAX6KZLGC_mfolMIo1HfZ2LGFHVkwzNCT8",
  authDomain: "reactt-63c73.firebaseapp.com",
  projectId: "reactt-63c73",
  storageBucket: "reactt-63c73.appspot.com",
  messagingSenderId: "699181563819",
  appId: "1:699181563819:web:fa6b8f420eb7d40787dcee",
  measurementId: "G-M13Q01EY6J"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

// const analytics = getAnalytics(app);