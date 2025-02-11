import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./addAdmin.css";
import { useNavigate } from "react-router-dom";

const AddAdmin = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [aadhaarNo, setaadhaarNo] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!firstName.trim()) {
      errors.firstName = "First name is required";
      isValid = false;
    }

    if (!lastName.trim()) {
      errors.lastName = "Last name is required";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.email = "Valid email is required";
      isValid = false;
    }

    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileNo || !mobileRegex.test(mobileNo)) {
      errors.mobileNo = "Valid 10-digit mobile number is required";
      isValid = false;
    }

    const aadharRegex = /^[0-9]{12}$/;
    if (!aadhaarNo || !aadharRegex.test(aadhaarNo)) {
      errors.aadhaarNo = "Valid 12-digit Aadhar number is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = {
      firstName,
      lastName,
      email,
      password,
      mobileNo,
      aadhaarNo,
    };

    try {
      const response = await axios.post(
        "https://parkvilla.ap-south-1.elasticbeanstalk.com/api/Parking- /Areas",
        data
      );
      console.log(response.data);
      navigate("/adminDashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Register</h1>

      <form>
        <table className="input-table">
          <tbody>
            <tr className="input-row">
              <td className="input-cell">First Name</td>
              <td className="input-cell">
                <input
                  type="text"
                  placeholder="Enter First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && <p className="text-danger">{errors.firstName}</p>}
              </td>
            </tr>
            <tr className="input-row">
              <td className="input-cell">Last Name</td>
              <td className="input-cell">
                <input
                  type="text"
                  placeholder="Enter Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && <p className="text-danger">{errors.lastName}</p>}
              </td>
            </tr>
            <tr className="input-row">
              <td className="input-cell">Email address</td>
              <td className="input-cell">
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="text-danger">{errors.email}</p>}
              </td>
            </tr>
            <tr className="input-row">
              <td className="input-cell">Password</td>
              <td className="input-cell">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="text-danger">{errors.password}</p>}
              </td>
            </tr>
            <tr className="input-row">
              <td className="input-cell">Confirm Password</td>
              <td className="input-cell">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword}</p>}
              </td>
            </tr>
            <tr className="input-row">
              <td className="input-cell">Mobile Number</td>
              <td className="input-cell">
                <input
                  type="text"
                  placeholder="Enter Mobile Number"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                />
                {errors.mobileNo && <p className="text-danger">{errors.mobileNo}</p>}
              </td>
            </tr>
            <tr className="input-row">
              <td className="input-cell">Aadhar Number</td>
              <td className="input-cell">
                <input
                  type="text"
                  placeholder="Enter Aadhar Number"
                  value={aadhaarNo}
                  onChange={(e) => setaadhaarNo(e.target.value)}
                />
                {errors.aadhaarNo && <p className="text-danger">{errors.aadhaarNo}</p>}
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="input-cell">
                <button type="submit" onClick={handleSubmit}>
                  Submit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default AddAdmin;
