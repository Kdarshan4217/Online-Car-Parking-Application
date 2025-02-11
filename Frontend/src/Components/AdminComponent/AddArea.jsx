import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RegisterSecurity.css";
import { Link } from "react-router-dom";

const AddArea = () => {
  const [areaName, setAreaName] = useState("");
  const [totalSlots, setTotalSlots] = useState("");
  const [rate, setRate] = useState("");
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem("token");

  const validateForm = () => {
    let formErrors = {};
    if (!areaName.trim()) {
      formErrors.areaName = "Area name is required";
    }
    if (!totalSlots || isNaN(totalSlots) || totalSlots <= 0) {
      formErrors.totalSlots = "Total slots must be a positive number";
    }
    if (!rate || isNaN(rate) || rate <= 0) {
      formErrors.rate = "Rate must be a positive number";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = { areaName, totalSlots, rate };

    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.post(
        "https://parkvilla.ap-south-1.elasticbeanstalk.com/api/Parkingareas",
        data,
        { headers: headers }
      );
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Parking Area</h1>

      <form>
        <table className="input-table">
          <tbody>
            <tr className="input-row">
              <td className="input-cell">Area name</td>
              <td className="input-cell">
                <input
                  type="text"
                  placeholder="Enter Area name"
                  value={areaName}
                  onChange={(e) => setAreaName(e.target.value)}
                />
                {errors.areaName && (
                  <p className="text-danger">{errors.areaName}</p>
                )}
              </td>
            </tr>
            <tr className="input-row">
              <td className="input-cell">Slot</td>
              <td className="input-cell">
                <input
                  type="text"
                  placeholder="Enter slot"
                  value={totalSlots}
                  onChange={(e) => setTotalSlots(e.target.value)}
                />
                {errors.totalSlots && (
                  <p className="text-danger">{errors.totalSlots}</p>
                )}
              </td>
            </tr>
            <tr className="input-row">
              <td className="input-cell">Rate</td>
              <td className="input-cell">
                <input
                  type="number"
                  placeholder="Enter rate"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
                {errors.rate && <p className="text-danger">{errors.rate}</p>}
              </td>
            </tr>
            <tr className="input-row">
              <td colSpan={2} className="input-cell">
                <button
                  className="btn btn-info"
                  type="submit"
                  onClick={handleSubmit}
                >
                  <Link to={"/area"} className="text-white text-decoration-none">
                    Submit
                  </Link>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default AddArea;
