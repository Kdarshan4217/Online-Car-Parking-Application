import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SecurityTable = () => {
  const [securityList, setSecurityList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editedSecurity, setEditedSecurity] = useState(null);

  useEffect(() => {
    const fetchSecurityList = async () => {
      try {
        const response = await axios.get("https://parkvilla.ap-south-1.elasticbeanstalk.com/api/UserDetails");
        setSecurityList(response.data);
      } catch (error) {
        toast.error("Failed to fetch security data");
      }
    };
    fetchSecurityList();
  }, []);

  const handleDelete = async (securityId) => {
    try {
      await axios.delete(`https://parkvilla.ap-south-1.elasticbeanstalk.com/api/UserDetails/${securityId}`);
      setSecurityList(securityList.filter((security) => security.userId !== securityId));
      toast.success("Security record deleted successfully!");
    } catch (error) {
      toast.error("Error deleting security record");
    }
  };

  const handleEdit = (security) => {
    setEditedSecurity(security);
    setShowModal(true);
  };

  const validateForm = () => {
    const { firstName, lastName, mobileNo, email, aadhaarNo } = editedSecurity;

    if (!/^[A-Za-z]+$/.test(firstName)) {
      toast.error("First Name should only contain letters");
      return false;
    }
    if (!/^[A-Za-z]+$/.test(lastName)) {
      toast.error("Last Name should only contain letters");
      return false;
    }
    if (!/^\d{10}$/.test(mobileNo)) {
      toast.error("Mobile No. should be exactly 10 digits");
      return false;
    }
    if (!/^\d{12}$/.test(aadhaarNo)) {
      toast.error("Aadhar No. should be exactly 12 digits");
      return false;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      toast.error("Invalid email format");
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      await axios.put(`https://parkvilla.ap-south-1.elasticbeanstalk.com/api/UserDetails/${editedSecurity.userId}`, editedSecurity);
      setSecurityList(
        securityList.map((security) =>
          security.userId === editedSecurity.userId ? editedSecurity : security
        )
      );
      toast.success("Security details updated successfully!");
      setShowModal(false);
    } catch (error) {
      toast.error("Error updating security details");
    }
  };

  const handleCancel = () => {
    setEditedSecurity(null);
    setShowModal(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedSecurity({ ...editedSecurity, [name]: value });
  };

  return (
    <>
      <ToastContainer position={toast.POSITION.TOP_CENTER} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Mobile No.</th>
            <th>Aadhar No.</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {securityList.map((security) => (
            <tr key={security.userId}>
              <td>{security.userId}</td>
              <td>{security.firstName}</td>
              <td>{security.lastName}</td>
              <td>{security.email}</td>
              <td>{security.mobileNo}</td>
              <td>{security.aadhaarNo}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(security)}>
                  Edit
                </Button>{" "}
                <Button variant="danger" onClick={() => handleDelete(security.userId)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Security Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                name="firstName"
                value={editedSecurity?.firstName || ""}
                onChange={handleInputChange}
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
              />
            </Form.Group>

            <Form.Group controlId="formBasicMobile">
              <Form.Label>Mobile No.</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter mobile number"
                name="mobileNo"
                value={editedSecurity?.mobileNo || ""}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                name="email"
                value={editedSecurity?.email || ""}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicAadhar">
              <Form.Label>Aadhar No.</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Aadhar number"
                name="aadhaarNo"
                value={editedSecurity?.aadhaarNo || ""}
                onChange={handleInputChange}
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
    </>
  );
};

export default SecurityTable;
