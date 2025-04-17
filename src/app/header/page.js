"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "../cart/CartContext";
import Cookies from "js-cookie";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const { cartCount } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const savedMode = localStorage.getItem("theme") === "dark";
    setDarkMode(savedMode);
    document.body.classList.toggle("bg-dark", savedMode);
    document.body.classList.toggle("text-white", savedMode);

    // ✅ check login status
    const loginStatus = Cookies.get("isLoggedIn");
    const email = Cookies.get("userEmail");
    if (loginStatus === "true") {
      setIsLoggedIn(true);
      setUserEmail(email);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle("bg-dark", newMode);
    document.body.classList.toggle("text-white", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const handleLogout = () => {
    Cookies.remove("isLoggedIn");
    Cookies.remove("userEmail");
    setIsLoggedIn(false);
    setUserEmail("");
    window.location.href = "/"; // redirect to home
  };

  return (
    <div className="container">
      <div className="navbar navbar-expand-lg p-1">
        <div className="navbar-brand">
          <h3><a className="text-success">Shopping</a></h3>
        </div>
        <div className="collapse navbar-collapse justify-content-around" id="navbar">
          <ul className="navbar-nav gap-2">
            <li className="nav-item"><Link className="nav-link text-primary" href="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link text-primary" href="/shop">Shop</Link></li>
            <li className="nav-item"><Link className="nav-link text-primary" href="/dashboard">Dashboard</Link></li>
            {isLoggedIn ? (
              <li className="nav-item"><Link className="nav-link text-primary" href="/profile">Profile</Link></li>
            ) : (
              <li className="nav-item"><Link className="nav-link text-primary" href="/signin">Sign In</Link></li>
            )}
          </ul>
        </div>

        <div className="d-flex align-items-end gap-3">
          {/* 👇 Modal or Profile Button */}
          <div>
            {isLoggedIn ? (
              <div>
                <span className="text-success">Hi, {userEmail}</span>
                <button className="btn btn-outline-danger ms-2" onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal">
                <span className="bi bi-person-circle"></span>
              </button>
            )}
          </div>

          <Link className="btn btn-primary position-relative" href="/cart">
            <span className="bi bi-cart4"></span>
            <span className="badge rounded-circle bg-danger position-absolute">{cartCount}</span>
          </Link>

          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="darkModeToggle" checked={darkMode} onChange={toggleDarkMode} />
            <label className="form-check-label" htmlFor="darkModeToggle">{darkMode ? "Dark" : "Light"}</label>
          </div>
        </div>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      {/* 👇 Sign Up Modal — hidden if logged in */}
      {!isLoggedIn && (
        <div className="modal fade fw-lighter" id="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <h3 className="fw-bold">Sign Up</h3>
                <dl>
                  <dt>Name</dt>
                  <dd><input className="form-control" placeholder="Enter Your Name" /></dd>
                  <dt>Email</dt>
                  <dd><input className="form-control" placeholder="Enter Email address" /></dd>
                  <dt>Password</dt>
                  <dd><input className="form-control" placeholder="Enter Password" /></dd>
                  <div className="sm">
                    By Signup, you agree to our <span className="text-success">Terms of Service & Privacy Policy</span>
                  </div>
                </dl>
                <button className="btn btn-primary">Sign Up</button>
                <div>
                  Already have an account?
                  <Link href="/signin" data-bs-dismiss="modal">Sign in</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
