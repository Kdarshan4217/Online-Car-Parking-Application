import React from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../../images/pk2.jpeg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./bookingDetails.css";

function BookingDetails() {
  const areaName = localStorage.getItem("areaName");
  const areaId = localStorage.getItem("areaId");
  const zoneName = localStorage.getItem("zoneName");
  const zoneId = localStorage.getItem("zoneId");
  const slotName = localStorage.getItem("slotName");
  const slotId = localStorage.getItem("slotId");
  const userId = localStorage.getItem("userId");
  const carId = localStorage.getItem("carNo");
  const fromDate = localStorage.getItem("parkingFromDate");
  const fromTime = localStorage.getItem("parkingFromTime");
  const toDate = localStorage.getItem("parkingToDate");
  const toTime = localStorage.getItem("parkingToTime");
  const rate = parseFloat(localStorage.getItem("areaRate")).toFixed(2);


  const fromDateTime = new Date(`${fromDate}T${fromTime}`);
  const toDateTime = new Date(`${toDate}T${toTime}`);
  const timeDiffInMs = toDateTime.getTime() - fromDateTime.getTime();
  const timeDiffInHours = timeDiffInMs / 3600000;

  const totalAmt = Math.round(timeDiffInHours * rate * 100) / 100;


  const navigate = useNavigate();

  // Function to handle the payment
  const onButtonClick = () => {
    // Razorpay options (use dummy data for testing)
    const options = {
      key: "rzp_test_LMZHnNT5VlTSU1", // Replace with your Razorpay key
      amount: totalAmt * 100, // Amount in paise
      currency: "INR",
      name: "Parking Booking",
      description: "Complete your parking payment",
      image: "https://example.com/logo.png", // Optional: Your logo
      handler: function (response) {
        // Simulate successful payment and redirect
        console.log("Payment successful", response);
        navigate("/parkingreceipt");
      },
      prefill: {
        name: "John Doe", // Replace with user name
        email: "user@example.com", // Replace with user email
        contact: "1234567890", // Replace with user contact
      },
      notes: {
        address: "Some address", // Optional: Add any notes
      },
    };

    // Open the Razorpay payment window
    const rzp = new window.Razorpay(options);
    rzp.open();
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
          <tbody>
            <tr>
              <td>Area Name</td>
              <td>{areaName}</td>
            </tr>
            <tr>
              <td>Zone Name</td>
              <td>{zoneName}</td>
            </tr>
            <tr>
              <td>Slot Name</td>
              <td>{slotName}</td>
            </tr>
            <tr>
              <td>Duration (in hours)</td>
              <td>{timeDiffInHours}</td>
            </tr>
            <tr>
              <td>Rate</td>
              <td>{rate}</td>
            </tr>
            <tr>
              <td>Car Number</td>
              <td>{carId}</td>
            </tr>
            <tr>
              <td>Total Amount</td>
              <td>{totalAmt}</td>
            </tr>
          </tbody>
        </table>
        <div className="text-center mt-3">
          <Button
            onClick={onButtonClick}
            className="btn btn-dark me-2"
            style={{ height: 50, width: 150 }}
            variant="primary"
          >
            Confirm Payment
          </Button>
        </div>
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
}

export default BookingDetails;
