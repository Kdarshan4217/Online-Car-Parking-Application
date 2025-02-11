import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RegisterSecurity.css";
import { Link } from "react-router-dom";

const AddSlot = () => {
  const [zoneId, setZoneId] = useState("");
  const [slotName, setSlotName] = useState("");
  const [errors, setErrors] = useState({});
  const token = localStorage.getItem("token");

  const validateForm = () => {
    let newErrors = {};

    if (!zoneId.trim()) newErrors.zoneId = "Zone ID is required";
    else if (!/^\d+$/.test(zoneId)) newErrors.zoneId = "Zone ID must be a number";

    if (!slotName.trim()) newErrors.slotName = "Slot Name is required";
    else if (!/^[A-Za-z\s]+$/.test(slotName)) newErrors.slotName = "Slot Name can only contain letters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = { zoneId, slotName };

    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.post("https://parkvilla.ap-south-1.elasticbeanstalk.com/api/ParkingSlots", data, { headers });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Parking Slot</h1>

      <form>
        <table className="input-table">
          <tbody>
            <tr className="input-row">
              <td className="input-cell">Zone Id</td>
              <td className="input-cell">
                <input
                  type="text"
                  placeholder="Enter Zone ID"
                  value={zoneId}
                  onChange={(e) => setZoneId(e.target.value)}
                />
                {errors.zoneId && <small className="text-danger">{errors.zoneId}</small>}
              </td>
            </tr>

            <tr className="input-row">
              <td className="input-cell">Slot Name</td>
              <td className="input-cell">
                <input
                  type="text"
                  placeholder="Enter Slot Name"
                  value={slotName}
                  onChange={(e) => setSlotName(e.target.value)}
                />
                {errors.slotName && <small className="text-danger">{errors.slotName}</small>}
              </td>
            </tr>

            <tr className="input-row">
              <td colSpan={2} className="input-cell">
                <button className="btn btn-info" type="submit" onClick={handleSubmit}>
                  <Link to={"/slot"} className="text-white text-decoration-none">Submit</Link>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default AddSlot;
