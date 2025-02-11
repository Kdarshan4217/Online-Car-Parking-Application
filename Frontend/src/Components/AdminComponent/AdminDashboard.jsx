import { Link } from "react-router-dom";
import img1 from "../../images/cb3.jpg";

function AdminDashboard() {
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
      <hr />

      <nav style={{ textAlign: "center" }}>
        <Link to={"/user"} style={linkStyle}>
          User
        </Link>
        {/* {" | "} */}
        {/* <Link to={"/security"} style={linkStyle}>
          Security
        </Link> */}
        {" | "}
        <Link to={"/adminparking"} style={linkStyle}>
          Parking
        </Link>
        {" | "}
        <Link to={"/area"} style={linkStyle}>
          Area
        </Link>
        {" | "}
        <Link to={"/zone"} style={linkStyle}>
          Zone
        </Link>
        {" | "}
        <Link to={"/slot"} style={linkStyle}>
          Slot
        </Link>
        {" | "}
        <Link to={"/car"} style={linkStyle}>
          Car
        </Link>
        {" | "}
        {/* <Link to={"/feedback"} style={linkStyle}>
          Feedback
        </Link> */}
        {/* {" | "} */}
        {/* <Link to={"/addadmin"} style={linkStyle}>
          Add Admin
        </Link> */}
      </nav>

      <hr />
    </div>
  );
}

// Common Link Styling
const linkStyle = {
  color: "green",
  fontStyle: "revert",
  fontWeight: 600,
  textDecoration: "none",
  margin: "0 10px",
};

export default AdminDashboard;
