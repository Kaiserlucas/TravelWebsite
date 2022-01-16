import React from 'react'
import './style.css'

export default function Navbar() {
    return (
      <div className="navbar">
        <ul className="navlist">
          <li className="nav-item">
            <a href="karte.html">
              <img id="logo" src="../../ressources/logo.png" alt="logo" />
            </a>
          </li>
          <li className="nav-item">
            <a href="karte.html">Startseite</a>
          </li>
          <li className="nav-item">
            <a href="reisen.html">Reisen</a>
          </li>
          <li className="nav-item">
            <form action="login.html">
              <button>Logout</button>
            </form>
          </li>
        </ul>
      </div>
    );
}
