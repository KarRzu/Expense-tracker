import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA06RFIS9Hh7K1rb05oCa3FRxemT4TlDEk",
  authDomain: "expense-tracker-c09c6.firebaseapp.com",
  projectId: "expense-tracker-c09c6",
  storageBucket: "expense-tracker-c09c6.appspot.com",
  messagingSenderId: "1007138449973",
  appId: "1:1007138449973:web:9c9e383b2b869facb75f7c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
