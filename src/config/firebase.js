
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from 'firebase/firestore'



const firebaseConfig = {
  apiKey: "AIzaSyCPu5MSW4jFN1i_a6k-ewBIttriDNgWfag",
  authDomain: "firstreeact.firebaseapp.com",
  projectId: "firstreeact",
  storageBucket: "firstreeact.appspot.com",
  messagingSenderId: "438752453193",
  appId: "1:438752453193:web:f3b8ab8db0324a06359598",
  measurementId: "G-7QLFBH19NQ"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app)