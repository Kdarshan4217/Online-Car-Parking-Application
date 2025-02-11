import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import backgroundImage from "../../images/cb3.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:9090/auth/signin", {
        email,
        password,
      });

      const { jwt, role, userId } = response.data;

      localStorage.setItem("token", jwt);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);

      switch (role) {
        case "ROLE_ADMIN":
          navigate("/adminDashboard");
          break;
        case "ROLE_SECURITY":
          navigate("/securityDashboard");
          break;
        default:
          navigate("/userDashboard");
          break;
      }

      console.log(response.data);
    } catch (error) {
      window.alert("Please enter the correct credentials or register first.");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="login-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4}>
            <h2 className="text-center mb-4">Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="position-relative">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <i
                  className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} password-icon`}
                  onClick={handleShowPassword}
                  style={{ cursor: "pointer", position: "absolute", right: 10, top: 38 }}
                ></i>
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-3">
                Login
              </Button>
            </Form>
            <div className="text-center mt-3">
              <span>Don't have an account?</span>
              <Link to="/signin" className="ml-2">
                Register here
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
