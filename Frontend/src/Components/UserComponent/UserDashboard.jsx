

import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import backgroundImage from "../../images/park5.jpg";
import { Button, Container, Row, Col, Form } from "react-bootstrap";

function UserDashboard() {
  const [selectedArea, setSelectedArea] = useState("Select Area");
  const [area, setArea] = useState([]);
  const [message, setMessage] = useState("Welcome to ParkVilla");

  const handlePhaseChange = (event) => {
    const selectedValue = event.target.value;
    if (!selectedValue) return;

    const selectedAreaObject = area.find((area) => area.areaName === selectedValue);

    if (!selectedAreaObject) {
      alert("Invalid area selection!");
      return;
    }

    localStorage.setItem("areaId", selectedAreaObject.areaId);
    localStorage.setItem("areaName", selectedAreaObject.areaName);
    localStorage.setItem("areaRate", selectedAreaObject.rate);

    setSelectedArea(selectedValue);
    setMessage(`Parking Charges at ${selectedAreaObject.areaName} is ${selectedAreaObject.rate}`);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication token missing! Please log in.");
      return;
    }

    axios
      .get("https://parkvilla.ap-south-1.elasticbeanstalk.com/api/Parkingareas", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setArea(response.data);
        } else {
          console.error("Invalid response format:", response.data);
          alert("Failed to fetch parking areas. Please try again later.");
        }
      })
      .catch((error) => {
        console.error("Error fetching parking areas:", error);
        alert("Could not fetch parking areas. Please check your connection.");
      });
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container>
        {/* Welcome Message */}
        <Row className="mb-3 text-center">
          <Col>
            <h2 className="bg-warning text-dark p-2 rounded fw-bold">{message}</h2>
          </Col>
        </Row>

        {/* Dropdown Section */}
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label className="text-dark fw-bold">Select Area</Form.Label>
              <Form.Select value={selectedArea} onChange={handlePhaseChange}>
                <option value="Select Area" disabled>
                  Select Area
                </option>
                {area.map((option) => (
                  <option key={option.areaId} value={option.areaName}>
                    {option.areaName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Right-Side Buttons */}
        <Row className="mb-3 text-center">
          <Col md={4}>
            <Link to={"/userparking"}>
              <Button className="btn btn-dark w-100">Parking Details</Button>
            </Link>
          </Col>
          <Col md={4}>
            <Link to={"/updateuser"}>
              <Button className="btn btn-dark w-100">Your Details</Button>
            </Link>
          </Col>
          <Col md={4}>
            <Link to={"/getcar"}>
              <Button className="btn btn-dark w-100">Car Details</Button>
            </Link>
          </Col>
        </Row>

        {/* Bottom Button */}
        <Row className="mt-4 text-center">
          <Col>
            <Link to={"/book"}>
              <Button className="btn btn-dark w-50">Book</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UserDashboard;



