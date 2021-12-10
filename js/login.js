const loginForm = document.querySelector('#loginForm');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

/*const wantedEmail = 'huehne@htw-berlin.de';
const wantedPassword = 'hunter2';*/
const toUrlEncoded = obj => Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&');

loginForm.addEventListener('submit', () => {
  const loginInformation = { email: email.value, password: password.value };
  const encoded = toUrlEncoded(loginInformation);
  const json = JSON.stringify(loginInformation);
  console.log(encoded);
  const fetchParams = {
    headers: {
      'content-type': 'application/json',
    },
    body: json,
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
  };
  fetch('https://webdevelopment-travelsite.herokuapp.com/login', fetchParams)
    .then((data) => {
      return data.json();
    })
    .then((res) => console.log(res))
    .catch((error) => console.log(error));

  /*if (email.value === wantedEmail && password.value === wantedPassword) {
    window.location.href = 'karte.html';
  } else {
    alert('Falscher Benutzername oder Password.');
  }*/
});
