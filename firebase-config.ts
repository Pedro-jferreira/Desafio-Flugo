import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuCjbJ4NGJG-iJ9a_X4Y-_4kuYR8XRJLI",
  authDomain: "desafio-funcionarios.firebaseapp.com",
  projectId: "desafio-funcionarios",
  storageBucket: "desafio-funcionarios.firebasestorage.app",
  messagingSenderId: "781425282182",
  appId: "1:781425282182:web:56e5218e39df8b63869507"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);