import React from 'react';
import backgroundImage from '../../images/car3.jpeg';
import whatsapp from '../../images/wp.jpg';
import instagram from '../../images/ig.jpg';
import facebook from '../../images/fb.jpg';
import twitter from '../../images/twr.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';

import './Home.css';

function Home() {
  return (
    <div className="home-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Responsive Navigation Buttons */}
      <div className="button-container d-lg-none">
        <button className="btn btn-outline-light mb-2 w-75 ">Home</button>
        <button className="btn btn-outline-light mb-2 w-75">About</button>
        <button className="btn btn-outline-light mb-2 w-75">Login</button>
        <button className="btn btn-outline-light w-75">Contact</button>
       
      </div>

      {/* Centered "CAR PARKING" Text */}
      <div className="text-center car-parking-text">
        <h1>CAR PARKING</h1>
      </div>

      {/* Social Media Follow Us Section */}
      <div className="follow-section">
        <p className="font-weight-bold text-white mb-3">Follow Us On</p>
        <div className="d-flex justify-content-center gap-4">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <img src={instagram} alt="Instagram" className="social-icon" />
          </a>
          <a href="https://www.whatsapp.com/" target="_blank" rel="noopener noreferrer">
            <img src={whatsapp} alt="WhatsApp" className="social-icon" />
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <img src={facebook} alt="Facebook" className="social-icon" />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
            <img src={twitter} alt="Twitter" className="social-icon" />
          </a>
        </div>
      </div>

    
    </div>
  );
}

export default Home;
