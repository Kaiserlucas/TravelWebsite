import React from 'react';
import './style.css';
import { useNavigate } from 'react-router';

export default function Login({ probs }) {
  const navigate = useNavigate();

  function handleSubmit(event) {
    // const loginForm = document.querySelector('#loginForm');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');

    event.preventDefault();
    console.log('Submitted');
    const loginInformation = { email: email.value, password: password.value };
    const json = JSON.stringify(loginInformation);
    const fetchParams = {
      headers: {
        'content-type': 'application/json',
      },
      body: json,
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
    };

    function handleResponse(res) {
      console.log('Handle response');
      if (res.message === 'Bad email or password') {
        alert('Falscher Benutzername oder Passwort.');
      } else {
        //setTimeout((window.location.href = '/karte'), 500);
        setTimeout(
          navigate('/karte'),

          500
        );
      }
    }

    console.log('Starting to fetch');
    fetch('https://webdevelopment-travelsite.herokuapp.com/login', fetchParams)
      .then((data) => {
        console.log('Fetching');
        return data.json();
      })
      .then((res) => handleResponse(res))
      .catch((error) => console.log(error));
  }

  return (
    <div className="bg-container">
      <div className="login">
        <form action="#" id="loginForm" onSubmit={handleSubmit}>
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
        <h2 id="error" aria-label="heading"></h2>
      </div>
    </div>
  );
}
