"use client";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function ProfilePage() {
  const { currentUser } = useAuth();
    useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("https://fakestoreapi.com/users");
      const users = await res.json();
      const matchedUser = users.find(u => u.email === currentUser?.email);
      setUser(matchedUser);
    };
    if (currentUser?.email) fetchUser();
  }, [currentUser]);


  if (!currentUser) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Profile</h2>
      <div className="card p-4 shadow-sm">
        <h4 className="mb-3">Personal Info</h4>
        <p><strong>Email:</strong> {currentUser.email}</p>
        <p><strong>UID:</strong> {currentUser.uid}</p>
        {/* Firebase doesn't store name/phone by default */}
      </div>
    </div>
  );
}
