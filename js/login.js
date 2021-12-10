const loginForm = document.querySelector('#loginForm');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

/*const wantedEmail = 'huehne@htw-berlin.de';
const wantedPassword = 'hunter2';*/
const toUrlEncoded = obj => Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&');

toUrlEncoded({
   hello: 'world',
   message: "JavaScript is cool"
});
// => "hello=world&message=JavaScript%20is%20cool"

loginForm.addEventListener('submit', () => {
  const loginInformation = { email: email.value, password: password.value };
  const encoded = toUrlEncoded(encoded);
  console.log(encoded);

toUrlEncoded({
   hello: 'world',
   message: "JavaScript is cool"
});
// => "hello=world&message=JavaScript%20is%20cool"
    JSON.stringify(loginInformation).encod;
  const fetchParams = {
    headers: {
      'content-type': 'application/json',
    },
    body: encoded,
    method: 'POST',
    mode: 'cors',
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
