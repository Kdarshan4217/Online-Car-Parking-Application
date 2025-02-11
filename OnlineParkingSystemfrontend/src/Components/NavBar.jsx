import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { AuthContext } from './AuthContext'; // Import AuthContext
import "./Navbar.css";

export default function NavBar() {
  const { isLoggedIn, logout } = useContext(AuthContext); // Use context for authentication state

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand logo" href="#">Parkvilla</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link active" aria-current="page">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link active" aria-current="page">Contact</Link>
            </li>
          </ul>

          {isLoggedIn ? (
            <Button className="gradient-button" onClick={logout}>Logout</Button>
          ) : (
            <Link to="/login">
              <Button className="gradient-button">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
