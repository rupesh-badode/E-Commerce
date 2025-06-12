"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "../cart/CartContext";
import { useAuth } from "../context/AuthContext";
import useUser from "../utils/useUser";

export default function Header() {
  const { cartCount } = useCart();
  const{isLoggedIn,logout} = useAuth();
  const user = useUser();

  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="container-fluid  bg-body-tertiary">
      <div className="navbar navbar-expand-lg ">
        <div className="navbar-brand">
          <h3><a className="text-success" href="/home">Shopping</a></h3>
        </div>
        <div className="collapse navbar-collapse justify-content-center" id="navbar">
          <ul className="navbar-nav gap-3">
            <li className="nav-item"><Link className="nav-link text-primary" href="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link text-primary" href="/shop">Shop</Link></li>
            <li className="nav-item"><Link className="nav-link text-primary" href="/dashboard">Dashboard</Link></li>
            {isLoggedIn ? (
              <li className="nav-item"><Link className="nav-link text-primary" href="/profile">Profile</Link></li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link text-primary " href="/signin"><span className="bi bi-person-fill"></span> </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="d-flex flex-wrap  justify-content-end gap-1">
          <div>
            {isLoggedIn && (
              <div>
                <span className="text-success">Hi, {user.displayName}</span>
                <button className="btn btn-outline-danger ms-2" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
          <Link className="btn btn-primary position-relative" href="/cart">
            <span className="bi bi-cart4"></span>
            <span className="badge rounded-circle bg-danger position-absolute">{cartCount}</span>
          </Link>
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </div>
  );
}
