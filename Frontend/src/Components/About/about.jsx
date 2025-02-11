import React from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./about.css";
import backgroundImage from "../../images/pk2.jpeg";

function AboutUs() {
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
        padding: "50px 0",
      }}
    >
      <Container>
        <Card className="shadow-lg p-4" style={{ background: "rgba(255, 255, 255, 0.9)", borderRadius: "10px" }}>
          <h1 className="text-center bg-primary text-light py-3 rounded">About Us</h1>

          <Row className="mt-4">
            <Col md={12}>
              <h2 className="text-primary">Our Mission</h2>
              <p>
                At <strong>Online Parking System</strong>, our mission is to make parking easier, safer, and more
                convenient for everyone. We believe that finding a parking spot should be stress-free and simple,
                and we are committed to providing innovative solutions that make this a reality.
              </p>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col md={12}>
              <h2 className="text-primary">Our Website</h2>
              <p>Our website is designed to help you find parking spots quickly and easily. We offer a range of features, including:</p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">✅ Real-time parking availability information</li>
                <li className="list-group-item">✅ Booking and reservation options</li>
                <li className="list-group-item">✅ Payment processing</li>
                <li className="list-group-item">✅ Map-based navigation to your parking spot</li>
              </ul>
              <p className="mt-3">
                With our website, you can save time and reduce the stress of finding parking in crowded areas.
              </p>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col md={12}>
              <h2 className="text-primary">Parking in General</h2>
              <p>
                Parking can be a major hassle, especially in urban areas where space is at a premium. The average driver
                spends <strong>17 hours per year</strong> searching for parking, leading to increased traffic congestion,
                air pollution, and frustration. However, there are many ways to make parking easier and more convenient.
              </p>
              <p>Here are some tips:</p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">🚗 Use a parking website to find and reserve spots in advance</li>
                <li className="list-group-item">🚶‍♂️ Consider alternative modes of transportation like public transit or bike sharing</li>
                <li className="list-group-item">⚠️ Be aware of parking regulations and restrictions in your area</li>
                <li className="list-group-item">🤝 Consider carpooling to reduce the number of vehicles on the road</li>
              </ul>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col md={12}>
              <h2 className="text-primary">About Us</h2>
              <p>
                <strong>Online Parking System</strong> was developed in 2025 with the goal of making parking easier and
                more convenient for everyone. We are passionate about using technology to simplify the parking process
                and improve the overall customer experience. Our team of experienced professionals is dedicated to
                developing innovative solutions that make finding and using parking spots easier than ever.
              </p>
            </Col>
          </Row>
        </Card>
      </Container>
    </div>
  );
}

export default AboutUs;
