"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const loginStatus = Cookies.get("isLoggedIn");
    const email = Cookies.get("userEmail");
    if (loginStatus === "true" && email) {
      setIsLoggedIn(true);
      setUserEmail(email);
    }
  }, []);

  const login = (email) => {
    Cookies.set("isLoggedIn", "true");
    Cookies.set("userEmail", email);
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  const logout = () => {
    Cookies.remove("isLoggedIn");
    Cookies.remove("userEmail");
    setIsLoggedIn(false);
    setUserEmail("");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
