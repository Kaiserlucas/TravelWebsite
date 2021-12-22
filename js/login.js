const loginForm = document.querySelector('#loginForm');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

loginForm.addEventListener('submit', () => {
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
    if(res.message === 'Bad email or password') {
      alert('Falscher Benutzername oder Passwort.');
    } else {
      setTimeout(window.location.href = 'karte.html',500)
    }
  }

  fetch('https://webdevelopment-travelsite.herokuapp.com/login', fetchParams)
    .then((data) => {
      return data.json();
    })
    .then((res) =>
        handleResponse(res))
    .catch((error) =>
        console.log(error))
});
