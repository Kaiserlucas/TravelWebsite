const loginForm = document.querySelector('#loginForm');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const retypePassword = document.querySelector('#password-retype');

loginForm.addEventListener('submit', () => {
    if(password.value === retypePassword.value) {
    const signupInformation = { email: email.value, password: password.value };
    const json = JSON.stringify(signupInformation);
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
            alert('Serverseitiger Fehler. Bitte versuchen Sie es erneut.');
        } else {
            changePageContentAfterSignup()
        }
    }

    function changePageContentAfterSignup() {
        const div = document.querySelector('#div');
        const form = document.querySelector('#loginForm');
        form.remove()

        const header = document.createElement('h3');
        header.innerText = 'Registrierung abgeschickt.';
        div.appendChild(header);

        const text = document.createElement('p');
        text.innerText = 'Bitte bestätigen Sie Ihr Konto indem sie dem Link in der soeben versendeten Bestätigungsemail folgen.';
        div.appendChild(text);

        const link = document.createElement('a');
        link.innerText = 'Zurück zum Login';
        link.setAttribute('href','login.html')
        div.appendChild(link);
    }

    /*
    fetch('https://webdevelopment-travelsite.herokuapp.com/signup', fetchParams)
        .then((data) => {
            return data.json();
        })
        .then((res) =>
            handleResponse(res))
        .catch((error) =>
            console.log(error))
     */
        changePageContentAfterSignup()

    } else {
        alert('Passwörter sind nicht gleich.');
    }
});
