import React from 'react';
import './style.css';

export default function Navbar() {
  return (
    <div className="navbar">
      <ul className="navlist">
        <li className="nav-item">
          <a href="karte">
            <img id="logo" src="../../ressources/logo.png" alt="logo" />
          </a>
        </li>
        <li className="nav-item">
          <a href="karte">Startseite</a>
        </li>
        <li className="nav-item">
          <a href="reisen">Reisen</a>
        </li>
        <li className="nav-item">
          <form action="login">
            <button>Logout</button>
          </form>
        </li>
      </ul>
    </div>
  );
}
