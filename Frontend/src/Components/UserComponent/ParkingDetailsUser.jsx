

import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import Axios from "axios";
import img1 from "../../images/cb8.avif";
import { Link } from "react-router-dom";
import "./CarDetails.css";

const ParkingDetailsUser = () => {
  const [parkingdetail, setDetails] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await Axios.get(
          "https://parkvilla.ap-south-1.elasticbeanstalk.com/api/ParkingDetails",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDetails(response.data);
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
        <h2>Parking Details</h2>

        <Table className="table-bordered">
          <thead>
            <tr>
              <th>Details Id</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Slot Name</th>
              <th>Occupied</th>
              <th>Area Name</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {parkingdetail.map((parking) => (
              <tr key={parking.detailsId}>
                <td>{parking.detailsId}</td>
                <td>{parking.fromDate}</td>
                <td>{parking.toDate}</td>
                <td>{parking.customParkingSlot?.slotName}</td>
                <td>{parking.customParkingSlot?.isOccupied ? "Yes" : "No"}</td>
                <td>{parking.customParkingSlot?.customParkingZone?.customParkingArea?.areaName}</td>
                <td>{parking.customParkingSlot?.customParkingZone?.customParkingArea?.rate}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div>
          <Link to={"/userDashboard"}>
            <Button variant="primary" className="me-2">
              Previous
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ParkingDetailsUser;
