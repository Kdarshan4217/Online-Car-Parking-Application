
import React from 'react';

const Footer = () => {
  return (
    <footer className="page-footer bg-dark text-light py-2" style={{ marginTop: 'auto' }}>
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © {new Date().getFullYear()} My Parking Project
      </div>
    </footer>
  );
};

export default Footer;
