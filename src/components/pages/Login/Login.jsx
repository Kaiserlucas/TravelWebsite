import React from 'react'
import './style.css'

export default function Login() { 
    return (
      <div className="login">
        <form action="#" id="loginForm" onSubmit="return false;">
          <label htmlFor="email">E-Mail Adresse</label>
          <br />
          <input type="email" id="email" name="email" required />
          <br />
          <label htmlFor="password">Passwort</label>
          <br />
          <input type="password" id="password" name="password" required />
          <br />
          <br />
          <input type="submit" value="Login" />
        </form>
        <h2 id="error"></h2>
      </div>
    );
}
