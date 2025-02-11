import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Alert } from "react-bootstrap";
import img1 from "../../images/cb2f.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Link } from "react-router-dom";
import "./SecurityDetails.css";

const SecurityDetails = () => {
  const [security, setSecurity] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editedSecurity, setEditedSecurity] = useState(null);
  const [error, setError] = useState(""); // 🔴 Store validation errors
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/addsecurity");
  };

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`https://parkvilla.ap-south-1.elasticbeanstalk.com/api/UserDetails/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSecurity(security.filter((security) => security.userId !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (security) => {
    setEditedSecurity(security);
    setShowModal(true);
    setError(""); // Reset error when opening modal
  };

  const handleSave = async () => {
    // 🔴 Validation checks before saving
    if (!editedSecurity.firstName.trim() || !editedSecurity.lastName.trim()) {
      setError("First Name and Last Name are required.");
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };
    try {
      await Axios.put(
        `https://parkvilla.ap-south-1.elasticbeanstalk.com/api/UserDetails/${editedSecurity.userId}`,
        editedSecurity,
        { headers: headers }
      );
      setSecurity(
        security.map((sec) =>
          sec.userId === editedSecurity.userId ? editedSecurity : sec
        )
      );
      setShowModal(false);
    } catch (error) {
      setError("Failed to update security details. Please try again.");
    }
  };

  const handleCancel = () => {
    setEditedSecurity(null);
    setShowModal(false);
    setError(""); // Clear error when closing modal
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedSecurity({ ...editedSecurity, [name]: value });
  };

  useEffect(() => {
    const getSecurity = async () => {
      try {
        const response = await Axios.get(
          "https://parkvilla.ap-south-1.elasticbeanstalk.com/api/UserDetails",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSecurity(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSecurity();
  }, [token]); //  Fixed missing dependency issue

  return (
    <div
      style={{
        backgroundImage: `url(${img1})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        opacity: "1",
      }}
    >
      <div className="style">
        <h2>Security Details</h2>
        <div>
          <button className="btn btn-info" onClick={handleClick}>
            Add
          </button>
        </div>

        <Table className="table-bordered">
          <thead>
            <tr>
              <th>Security ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {security.map((security) => (
              <tr key={security.userId}>
                <td>{security.userId}</td>
                <td>{security.firstName}</td>
                <td>{security.lastName}</td>
                <td>{security.email}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(security)}
                  >
                    Edit
                  </Button>{" "}
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(security.userId)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Edit Security Details Modal */}
        <Modal show={showModal} onHide={handleCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Security Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/*  Show validation error if any */}
            {error && <Alert variant="danger">{error}</Alert>}

            <Form>
              <Form.Group controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  name="firstName"
                  value={editedSecurity?.firstName || ""}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  name="lastName"
                  value={editedSecurity?.lastName || ""}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicMobile">
                <Form.Label>Mobile No.</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter mobile number"
                  readOnly
                  name="mobileNo"
                  value={editedSecurity?.mobileNo || ""}
                  disabled
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter email"
                  name="email"
                  readOnly
                  value={editedSecurity?.email || ""}
                  disabled
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        <div>
          <Link to={"/adminDashboard"}>
            <Button variant="primary" className="me-2">
              Previous
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SecurityDetails;
