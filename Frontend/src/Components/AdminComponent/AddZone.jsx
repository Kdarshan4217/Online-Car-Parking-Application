import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RegisterSecurity.css";
import { Link } from "react-router-dom";

const AddZone = () => {
  const [areaId, setAreaId] = useState("");
  const [zoneArea, setZoneArea] = useState("");
  const [totalSlots, setTotalSlots] = useState("");
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem("token");

  const validateForm = () => {
    let newErrors = {};

    if (!areaId.trim()) newErrors.areaId = "Area ID is required";
    else if (!/^\d+$/.test(areaId)) newErrors.areaId = "Area ID must be a number";

    if (!zoneArea.trim()) newErrors.zoneArea = "Zone Area is required";
    else if (!/^[A-Za-z\s]+$/.test(zoneArea)) newErrors.zoneArea = "Zone Area can only contain letters";

    if (!totalSlots.trim()) newErrors.totalSlots = "Total Slots is required";
    else if (!/^\d+$/.test(totalSlots) || parseInt(totalSlots) <= 0)
      newErrors.totalSlots = "Total Slots must be a positive number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = { areaId, zoneArea, totalSlots };

    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.post("https://parkvilla.ap-south-1.elasticbeanstalk.com/api/ParkingZones", data, { headers });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Parking Zone</h1>

      <form>
        <table className="input-table">
          <tbody>
            <tr className="input-row">
              <td className="input-cell">Area Id</td>
              <td className="input-cell">
                <input
                  type="number"
                  placeholder="Enter Area Id"
                  value={areaId}
                  onChange={(e) => setAreaId(e.target.value)}
                />
                {errors.areaId && <small className="text-danger">{errors.areaId}</small>}
              </td>
            </tr>
            <tr className="input-row">
              <td className="input-cell">Zone Area</td>
              <td className="input-cell">
                <input
                  type="text"
                  placeholder="Enter Area name"
                  value={zoneArea}
                  onChange={(e) => setZoneArea(e.target.value)}
                />
                {errors.zoneArea && <small className="text-danger">{errors.zoneArea}</small>}
              </td>
            </tr>
            <tr className="input-row">
              <td className="input-cell">Total Slots</td>
              <td className="input-cell">
                <input
                  type="text"
                  placeholder="Enter slot"
                  value={totalSlots}
                  onChange={(e) => setTotalSlots(e.target.value)}
                />
                {errors.totalSlots && <small className="text-danger">{errors.totalSlots}</small>}
              </td>
            </tr>

            <tr className="input-row">
              <td colSpan={2} className="input-cell">
                <button className="btn btn-info" type="submit" onClick={handleSubmit}>
                  <Link to={"/zone"} className="text-white text-decoration-none">Submit</Link>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default AddZone;
