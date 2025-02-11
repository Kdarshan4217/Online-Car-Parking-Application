


import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import backgroundImage from "../../images/cb3.jpg";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!emailPattern.test(email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    if (!password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        "https://parkvilla.ap-south-1.elasticbeanstalk.com/api/Userdetails/login",
        {
          email,
          password,
        }
      );

      console.log("Login Response:", response.data);

      const { jwt, role, userId } = response.data;

      if (!role) {
        console.error("Role not found in response!");
        alert("Login failed! Invalid role.");
        return;
      }

      localStorage.setItem("token", jwt);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);

      console.log("Role received:", role);

      if (role.toUpperCase() === "ROLE_ADMIN") {
        navigate("/adminDashboard");
      } else {
        navigate("/userDashboard");
      }
    } catch (error) {
      console.error("Login Error:", error.response ? error.response.data : error);
      alert("Invalid credentials. Please try again or register first.");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4} className="login-container">
            <h2 className="text-center mb-4 text-white">Login</h2>
            <Form onSubmit={handleSubmit} noValidate>
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="text-white">Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={!!errors.email}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label className="text-white">Password</Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!errors.password}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
                <i
                  className={`bi bi-eye${showPassword ? "-slash" : ""} password-icon`}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-3">
                Login
              </Button>
            </Form>
            <div className="text-center mt-3">
              <span>Don't have an account?</span>
              <a href="/signin" className="ml-2">
                Register here
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;



