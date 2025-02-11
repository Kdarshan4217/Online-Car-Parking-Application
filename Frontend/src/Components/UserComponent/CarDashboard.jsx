import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./carDashboard.css";
import backgroundImage from "../../images/pk2.jpeg";
import { useNavigate } from "react-router-dom";

function CarDashboard1() {
  const [cars, setCars] = useState([]);
  const [selectedCarNo, setSelectedCarNo] = useState("");
  const [selectedCarType, setSelectedCarType] = useState("");
  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = (carNo, carType) => {
    let errors = {};
    let isValid = true;

    // Car Number Validation (Indian Format Example: MH12AB1234)
    const carNoPattern = /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/;
    if (!carNo.trim()) {
      errors.carNo = "Car Number is required";
      isValid = false;
    } else if (!carNoPattern.test(carNo)) {
      errors.carNo = "Invalid Car Number format (e.g., MH12AB1234)";
      isValid = false;
    }

    // Car Type Validation
    if (!carType.trim()) {
      errors.carType = "Car Type is required";
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(carType)) {
      errors.carType = "Car Type should contain only letters";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  var GetCarDetails = () => {
    const token = localStorage.getItem("token");
    var userId = localStorage.getItem("userId");

    axios
      .get(`https://parkvilla.ap-south-1.elasticbeanstalk.com/api/CarDetails/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setCars(response.data);
      });
  };

  var Clear = () => {
    setCars([]);
    setSelectedCarNo("");
    setSelectedCarType("");
    setErrors({});
  };

  var onSubmit = (carNo, carType, rowIndex) => {
    if (!validateForm(carNo, carType)) return;

    localStorage.setItem("carNo", carNo);
    localStorage.setItem("carType", carType);
    setSelectedRowIndex(rowIndex);
    // navigate("/bookingdetails");
  };

  var onNext = (carNo, carType, rowIndex) => {
    if (!validateForm(carNo, carType)) return;

    localStorage.setItem("carNo", carNo);
    localStorage.setItem("carType", carType);
    setSelectedRowIndex(rowIndex);
    navigate("/bookingdetails");
  };

  var handleCarNoChange = (event) => {
    setSelectedCarNo(event.target.value.toUpperCase());
  };

  var handleCarTypeChange = (event) => {
    setSelectedCarType(event.target.value);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="style">
        <table className="table-bordered">
          <thead>
            <tr>
              <th>Car No</th>
              <th>Car Type</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr
                key={car.carNo}
                className={selectedRowIndex === index ? "selected-row" : ""}
              >
                <td>{car.carNo}</td>
                <td>{car.carType}</td>
                <td>
                  <Button
                    className="btn btn-primary"
                    onClick={() => onSubmit(car.carNo, car.carType, index)}
                  >
                    Select
                  </Button>
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <input
                  type="text"
                  value={selectedCarNo}
                  placeholder="Enter Car No"
                  onChange={handleCarNoChange}
                />
                {errors.carNo && <p className="text-danger">{errors.carNo}</p>}
              </td>
              <td>
                <input
                  type="text"
                  value={selectedCarType}
                  placeholder="Enter Car Type"
                  onChange={handleCarTypeChange}
                />
                {errors.carType && <p className="text-danger">{errors.carType}</p>}
              </td>
              <td>
                <Button
                  className="btn btn-primary"
                  onClick={() => onSubmit(selectedCarNo, selectedCarType, -1)}
                >
                  Select
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <Button
          className="btn btn-dark"
          // onClick={() => onSubmit(selectedCarNo, selectedCarType, -1)}
          onClick={() => onNext(selectedCarNo, selectedCarType, -1)}
        >
          Next
        </Button>{" "}
        <Button className="btn btn-warning" onClick={Clear}>
          Clear
        </Button>
        <br />
        <Button className="btn btn-secondary" onClick={GetCarDetails}>
          Already have a Registered Car
        </Button>
      </div>
    </div>
  );
}

export default CarDashboard1;
