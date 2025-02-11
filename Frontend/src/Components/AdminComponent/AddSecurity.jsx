import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RegisterSecurity.css";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../../images/cb2f.jpg";

const AddSecurity = () => {
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
    let newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "First Name is required";
    else if (!/^[A-Za-z]+$/.test(firstName)) newErrors.firstName = "Only letters allowed";

    if (!lastName.trim()) newErrors.lastName = "Last Name is required";
    else if (!/^[A-Za-z]+$/.test(lastName)) newErrors.lastName = "Only letters allowed";

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email format";

    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (!confirmPassword.trim()) newErrors.confirmPassword = "Confirm Password is required";
    else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    if (!mobileNo.trim()) newErrors.mobileNo = "Mobile Number is required";
    else if (!/^\d{10}$/.test(mobileNo)) newErrors.mobileNo = "Mobile Number must be 10 digits";

    if (!aadhaarNo.trim()) newErrors.aadhaarNo = "Aadhar Number is required";
    else if (!/^\d{12}$/.test(aadhaarNo)) newErrors.aadhaarNo = "Aadhar Number must be 12 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const token = localStorage.getItem("token");
    const data = { firstName, lastName, email, password, mobileNo, aadhaarNo };

    try {
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.put("https://parkvilla.ap-south-1.elasticbeanstalk.com/api/UserDetails", data, { headers });
      console.log(response.data);
      navigate("/security");
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
        <div className="container mt-5">
          <h1 className="text-center mb-4">Register Security</h1>

          <form>
            <table className="input-table">
              <tbody>
                <tr className="input-row">
                  <td className="input-cell">First Name</td>
                  <td className="input-cell">
                    <input type="text" placeholder="Enter First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
                  </td>
                </tr>

                <tr className="input-row">
                  <td className="input-cell">Last Name</td>
                  <td className="input-cell">
                    <input type="text" placeholder="Enter Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
                  </td>
                </tr>

                <tr className="input-row">
                  <td className="input-cell">Email address</td>
                  <td className="input-cell">
                    <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    {errors.email && <small className="text-danger">{errors.email}</small>}
                  </td>
                </tr>

                <tr className="input-row">
                  <td className="input-cell">Password</td>
                  <td className="input-cell">
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {errors.password && <small className="text-danger">{errors.password}</small>}
                  </td>
                </tr>

                <tr className="input-row">
                  <td className="input-cell">Confirm Password</td>
                  <td className="input-cell">
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
                  </td>
                </tr>

                <tr className="input-row">
                  <td className="input-cell">Mobile Number</td>
                  <td className="input-cell">
                    <input type="text" placeholder="Enter Mobile Number" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} />
                    {errors.mobileNo && <small className="text-danger">{errors.mobileNo}</small>}
                  </td>
                </tr>

                <tr className="input-row">
                  <td className="input-cell">Aadhar Number</td>
                  <td className="input-cell">
                    <input type="text" placeholder="Enter Aadhar Number" value={aadhaarNo} onChange={(e) => setaadhaarNo(e.target.value)} />
                    {errors.aadhaarNo && <small className="text-danger">{errors.aadhaarNo}</small>}
                  </td>
                </tr>

                <tr>
                  <td colSpan={2} className="input-cell">
                    <Link to="/security">
                      <button className="btn btn-info" type="submit" onClick={handleSubmit}>
                        Submit
                      </button>
                    </Link>
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

export default AddSecurity;
