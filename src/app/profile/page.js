"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; 

export default function ProfilePage() {
  const { userEmail } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("https://fakestoreapi.com/users/1")
      const data = await res.json();
      setUser(data);
    };
    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Profile</h2>
      <div className="card p-4 shadow-sm">
        <h4 className="mb-3">Personal Info</h4>
        <p><strong>Name:</strong> {user.name.firstname} {user.name.lastname}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>

        <h4 className="mt-4">Address</h4>
        <p><strong>Street:</strong> {user.address.street}</p>
        <p><strong>City:</strong> {user.address.city}</p>
        <p><strong>Number:</strong> {user.address.number}</p>
        <p><strong>Zip Code:</strong> {user.address.zipcode}</p>
      </div>
    </div>
  );
}
