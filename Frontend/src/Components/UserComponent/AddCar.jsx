import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import img1 from "../../images/cb2f.jpg";
import { useNavigate } from "react-router-dom";

const AddCar = () => {
  const [carType, setCarType] = useState("");
  const [carNo, setCarNo] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Car Type Validation
    if (!carType.trim()) {
      errors.carType = "Car Type is required";
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(carType)) {
      errors.carType = "Car Type should contain only letters";
      isValid = false;
    }

    // Car Number Validation (Indian Format Example: MH12AB1234)
    const carNoPattern = /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/;
    if (!carNo.trim()) {
      errors.carNo = "Car Number is required";
      isValid = false;
    } else if (!carNoPattern.test(carNo)) {
      errors.carNo = "Invalid Car Number format (e.g., MH12AB1234)";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const data = { carType, carNo };

    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.post(
        `https://parkvilla.ap-south-1.elasticbeanstalk.com/api/Cardetails`,
        data,
        { headers: headers }
      );

      console.log(response.data);
      navigate("/getcar");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${img1})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          opacity: "0.8",
        }}
      >
        <div
          className="container mt-5"
          style={{ backgroundColor: "lightslategrey" }}
        >
          <h1 className="text-center mb-4">Add Your Car</h1>

          <form>
            <table className="input-table">
              <tbody>
                <tr className="input-row">
                  <td className="input-cell">Car Type</td>
                  <td className="input-cell">
                    <input
                      type="text"
                      placeholder="Enter Car Type"
                      value={carType}
                      onChange={(e) => setCarType(e.target.value)}
                    />
                    {errors.carType && <p className="text-danger">{errors.carType}</p>}
                  </td>
                </tr>
                <tr className="input-row">
                  <td className="input-cell">Car No</td>
                  <td className="input-cell">
                    <input
                      type="text"
                      placeholder="Enter Car No"
                      value={carNo}
                      onChange={(e) => setCarNo(e.target.value.toUpperCase())}
                    />
                    {errors.carNo && <p className="text-danger">{errors.carNo}</p>}
                  </td>
                </tr>

                <tr>
                  <td colSpan={2} className="input-cell">
                    <button
                      className="btn btn-info"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCar;
