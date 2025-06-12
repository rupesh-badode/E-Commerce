import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";




const firebaseConfig = {
    apiKey: "AIzaSyBVuKfiKIzTbcB1IX1jymXwuQ_VchcH9c8",
    authDomain: "e----commerce.firebaseapp.com",
    projectId: "e----commerce",
    storageBucket: "e----commerce.firebasestorage.app",
    messagingSenderId: "749345490806",
    appId: "1:749345490806:web:1617360afe2033d4e65c57",
    measurementId: "G-Z680F2TTNH"
};


const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth,app};

