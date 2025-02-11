



import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import img1 from "../../images/cb3.jpg";
import { Link } from "react-router-dom";
import "./ParkingAreaDetails.css";

const ParkingAreaDetails = () => {
  const [parkingArea, setParkingArea] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editedArea, setEditedArea] = useState(null);
  const [errors, setErrors] = useState({});

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/addarea");
  };

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`https://parkvilla.ap-south-1.elasticbeanstalk.com/api/ParkingAreas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setParkingArea(parkingArea.filter((details) => details.areaId !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (area) => {
    setEditedArea(area);
    setErrors({});
    setShowModal(true);
  };

  const validateForm = () => {
    let newErrors = {};

    if (!editedArea?.areaName.trim()) {
      newErrors.areaName = "Area Name is required.";
    }
    if (!editedArea?.totalSlots || isNaN(editedArea.totalSlots)) {
      newErrors.totalSlots = "Total Slots must be a valid number.";
    }
    if (!editedArea?.rate || isNaN(editedArea.rate)) {
      newErrors.rate = "Rate must be a valid number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      await Axios.put(
        `https://parkvilla.ap-south-1.elasticbeanstalk.com/api/ParkingAreas/${editedArea.areaId}`,
        editedArea,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setParkingArea(
        parkingArea.map((area) =>
          area.areaId === editedArea.areaId ? editedArea : area
        )
      );
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedArea({ ...editedArea, [name]: value });
  };

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await Axios.get(
          "https://parkvilla.ap-south-1.elasticbeanstalk.com/api/ParkingAreas",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setParkingArea(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDetails();
  }, []);

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
        <h2>Parking Area Details</h2>

        <div style={{ textAlign: "left" }}>
          <button className="btn btn-info" onClick={handleClick}>
            Add
          </button>
        </div>

        <Table className="table-bordered">
          <thead>
            <tr>
              <th>Area ID</th>
              <th>Area Name</th>
              <th>Total Slots</th>
              <th>Rate</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {parkingArea.map((parkingarea) => (
              <tr key={parkingarea.areaId}>
                <td>{parkingarea.areaId}</td>
                <td>{parkingarea.areaName}</td>
                <td>{parkingarea.totalSlots >= 0 ? parkingarea.totalSlots : "N/A"}</td> {/* ✅ Fix applied */}
                <td>{parkingarea.rate}</td>
                <td>
                  <Button variant="warning" onClick={() => handleEdit(parkingarea)}>
                    Edit
                  </Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => handleDelete(parkingarea.areaId)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={handleCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Area Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBasicAreaName">
                <Form.Label>Area Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter area name"
                  name="areaName"
                  value={editedArea?.areaName || ""}
                  onChange={handleInputChange}
                  isInvalid={!!errors.areaName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.areaName}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicTotalSlot">
                <Form.Label>Total Slots</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter total slots"
                  name="totalSlots"
                  value={editedArea?.totalSlots || ""}
                  onChange={handleInputChange}
                  isInvalid={!!errors.totalSlots}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.totalSlots}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicRate">
                <Form.Label>Rate</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter new rate"
                  name="rate"
                  value={editedArea?.rate || ""}
                  onChange={handleInputChange}
                  isInvalid={!!errors.rate}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.rate}
                </Form.Control.Feedback>
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

        <br />
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

export default ParkingAreaDetails;

