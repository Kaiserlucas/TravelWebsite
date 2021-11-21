
const loginForm = document.querySelector('#loginForm');
const email = document.querySelector('#email');
const password = document.querySelector('#password');

const wantedEmail = "huehne@htw-berlin.de";
const wantedPassword = "hunter2";

loginForm.addEventListener('submit', () => {
    if(email.value === wantedEmail && password.value === wantedPassword) {
        window.location.href = "karte.html";
    } else {
        alert("Falscher Benutzername oder Password.");
    }
});
