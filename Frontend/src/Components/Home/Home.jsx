import React, { useState } from 'react';
import backgroundImage from '../../images/park1.jpg';
import aboutUs from '../../images/aboutus.jpg';
import contactUs from '../../images/contact.png';
import login from '../../images/login.jpg';
import signIn from '../../images/signin.png';
import whatsapp from '../../images/wp.jpg';
import instagram from '../../images/ig.jpg';
import facebook from '../../images/fb.jpg';
import twitter from '../../images/twr.jpg';

function Home() {
  const [selectedPhase, setSelectedPhase] = useState('');

  const handlePhaseChange = (event) => {
    setSelectedPhase(event.target.value);
  };

  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* 🔹 Log In Icon */}
      <div
        style={{
          position: 'absolute',
          top: 30,
          right: 50,
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <a href="/login">
          <img
            src={login}
            alt="Login"
            style={{
              height: 50,
              width: 50,
              borderRadius: '50%',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
            }}
          />
        </a>
        <p
          style={{
            color: '#FF8C00',
            fontWeight: 'bold',
            marginTop: 5,
            fontSize: '16px',
          }}
        >
          Log In
        </p>
      </div>

      {/* 🔹 Register Icon */}
      <div
        style={{
          position: 'absolute',
          top: 30,
          right: 140,
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <a href="/signin">
          <img
            src={signIn}
            alt="Sign In"
            style={{
              height: 50,
              width: 50,
              borderRadius: '50%',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
            }}
          />
        </a>
        <p
          style={{
            color: '#FF8C00',
            fontWeight: 'bold',
            marginTop: 5,
            fontSize: '16px',
          }}
        >
          Register
        </p>
      </div>

      {/* 🔹 Contact Us Icon */}
      <div
        style={{
          position: 'absolute',
          top: 110,
          left: 30,
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <a href="/contact">
          <img
            src={contactUs}
            alt="Contact Us"
            style={{
              height: 50,
              width: 50,
              borderRadius: '50%',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
            }}
          />
        </a>
        <p style={{ color: '#FF8C00', fontWeight: 'bold', marginTop: 5 }}>Contact Us</p>
      </div>

      {/* 🔹 About Us Icon */}
      <div
        style={{
          position: 'absolute',
          top: 25,
          left: 30,
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <a href="/about">
          <img
            src={aboutUs}
            alt="About Us"
            style={{
              height: 50,
              width: 50,
              borderRadius: '50%',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
            }}
          />
        </a>
        <p style={{ color: '#FF8C00', fontWeight: 'bold', marginTop: 5 }}>About Us</p>
      </div>

      {/* 🔹 Follow Us Section */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
          width: 350,
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: 100,
          backgroundColor: '#20B2AA',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '20px',
          textAlign: 'center',
          borderRadius: '8px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.4)',
          letterSpacing: '1px',
          textTransform: 'uppercase',
        }}
      >
        <p> Follow Us On </p>
      </div>

      {/* 🔹 Social Media Icons */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 20,
          left: 0,
          right: 0,
        }}
      >
        <a href="https://www.instagram.com/" style={{ marginRight: 35 }}>
          <img
            src={instagram}
            alt="Instagram"
            style={{
              height: 50,
              width: 50,
              borderRadius: '50%',
              transition: 'transform 0.3s ease',
            }}
            onMouseOver={(e) => (e.target.style.transform = 'scale(1.2)')}
            onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
          />
        </a>

        <a href="https://www.whatsapp.com/" style={{ marginRight: 35 }}>
          <img
            src={whatsapp}
            alt="WhatsApp"
            style={{
              height: 50,
              width: 50,
              borderRadius: '50%',
              transition: 'transform 0.3s ease',
            }}
            onMouseOver={(e) => (e.target.style.transform = 'scale(1.2)')}
            onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
          />
        </a>

        <a href="https://www.facebook.com/" style={{ marginRight: 35 }}>
          <img
            src={facebook}
            alt="Facebook"
            style={{
              height: 50,
              width: 50,
              borderRadius: '50%',
              transition: 'transform 0.3s ease',
            }}
            onMouseOver={(e) => (e.target.style.transform = 'scale(1.2)')}
            onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
          />
        </a>

        <a href="https://twitter.com/">
          <img
            src={twitter}
            alt="Twitter"
            style={{
              height: 50,
              width: 50,
              borderRadius: '50%',
              transition: 'transform 0.3s ease',
            }}
            onMouseOver={(e) => (e.target.style.transform = 'scale(1.2)')}
            onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
          />
        </a>
      </div>
    </div>
  );
}

export default Home;
