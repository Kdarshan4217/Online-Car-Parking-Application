

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Button, Container, Navbar, Nav } from "react-bootstrap";

import "./Navbar.css";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }

  return (
    <Navbar expand="lg" className="navbar-dark bg-dark shadow-sm py-3">
      <Container>
        <Navbar.Brand className="fw-bold fs-4 text-white" href="/">
          Parkvilla
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="text-white fw-semibold mx-2">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="text-white fw-semibold mx-2">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="text-white fw-semibold mx-2">
              Contact
            </Nav.Link>
          </Nav>
          <div className="ms-3">
            {isLoggedIn ? (
              <Link to="/home">
                <Button
                  variant="outline-light"
                  className="gradient-button px-4"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="primary" className="gradient-button px-4">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
