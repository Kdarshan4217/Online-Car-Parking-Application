import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import backgroundImage from "../../images/fe.png";
import { useNavigate } from "react-router-dom";

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

    if (email === "admin" && password === "admin") {
      window.alert("Welcome Admin!");
      navigate("/adminDashboard");
    } else {
      window.alert("Invalid Credentials! Please try again.");
      setEmail("");
      setPassword("");
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Container className="h-100 d-flex justify-content-center align-items-center">
        <Row className="w-100">
          <Col xs={12} md={8} lg={4} className="mx-auto">
            <div className="login-form p-4 shadow-lg rounded">
              <h2 className="text-center mb-4 text-white">Login</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="text-white">Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3 position-relative" controlId="formBasicPassword">
                  <Form.Label className="text-white">Password</Form.Label>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                  <i
                    className={`bi bi-eye${showPassword ? "-slash" : ""} password-icon`}
                    onClick={handleShowPassword}
                  ></i>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 gradient-button mb-3"
                >
                  Login
                </Button>
              </Form>

              {/* Register Button */}
              <div className="text-center">
                <span className="text-white">Don't have an account?</span>
                <Button
                  variant="secondary"
                  className="w-100 mt-2 gradient-button"
                  onClick={handleRegisterRedirect}
                >
                  Register
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
