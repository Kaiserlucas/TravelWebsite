const loginForm = document.querySelector('#loginForm');
const password = document.querySelector('#password');

loginForm.addEventListener('submit', () => {
    const verificationID = { verificationID: password.value };
    const json = JSON.stringify(verificationID);
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

    fetch('https://webdevelopment-travelsite.herokuapp.com/verify', fetchParams)
        .then((data) => {
            return data.json();
        })
        .then((res) =>
            handleResponse(res))
        .catch((error) =>
            console.log(error))
});