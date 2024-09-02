import React from 'react';
import './navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><a href="/">Home</a></li>
        <li className="navbar-item"><a href="/adhar">Adhar</a></li>
        <li className="navbar-item"><a href="/pancard">Pan Card</a></li>
        <li className="navbar-item"><a href="/bankacc">Bank Account</a></li>
        <li className="navbar-item"><a href="/gst">GST</a></li>
        <li className="navbar-item"><a href="/address">Address</a></li>
        <li className="navbar-item"><a href="/showdata">Show Data</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;



