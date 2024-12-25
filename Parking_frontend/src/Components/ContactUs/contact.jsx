import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./contact.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import contactUsImage from '../../images/contactus.jpg';

function Contact() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success("We will reach you soon!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
    });
    navigate("/Home");
  };

  return (
    <div className="contact3 py-5 bg-light">
      <ToastContainer position={toast.POSITION.TOP_CENTER} />
      <div className="container">
        <div className="row align-items-center">
          {/* Image Section */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <img
              src={contactUsImage}
              className="img-fluid rounded shadow contact-image" // Added custom class
              alt="Contact Us"
            />
          </div>

          {/* Form Section */}
          <div className="col-lg-6">
            <div className="p-4 p-md-5 bg-white rounded shadow">
              <h1 className="font-weight-bold mb-4 text-danger">Quick Contact</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Your Email"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Phone Number"
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Your Message"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-danger btn-block mt-3 py-2"
                >
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Contact Information Cards */}
        <div className="row mt-5 text-center">
          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow h-100">
              <div className="card-body">
                <img
                  src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon1.png"
                  alt="Address"
                  className="mb-3"
                />
                <h5 className="font-weight-bold">Address</h5>
                <p>Parkvilla Parking Space, Pune</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow h-100">
              <div className="card-body">
                <img
                  src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon2.png"
                  alt="Phone"
                  className="mb-3"
                />
                <h5 className="font-weight-bold">Phone</h5>
                <p>02582 112233 <br /> 02582 223344</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow h-100">
              <div className="card-body">
                <img
                  src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon3.png"
                  alt="Email"
                  className="mb-3"
                />
                <h5 className="font-weight-bold">Email</h5>
                <p>parkvilla@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
