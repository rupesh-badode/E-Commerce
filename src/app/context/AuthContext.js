"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [useremail,setUseremail]  = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user){
        setCurrentUser(user);
        setUseremail(user.email);
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
        setUseremail(null);
      }
    });
    return () => unsubscribe();
  }, []);

  function logout(){
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn,useremail,logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
