const loginForm = document.querySelector('#loginForm');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

/*const wantedEmail = 'huehne@htw-berlin.de';
const wantedPassword = 'hunter2';*/

loginForm.addEventListener('submit', () => {
  const loginInformation = { email: email.value, password: password.value };

  const fetchParams = {
    headers: {
      'content-type': 'application/json',
    },
    body: loginInformation,
    method: 'POST',
    mode: 'no-cors',
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
