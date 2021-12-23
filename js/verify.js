const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

if(id) {
    const verificationID = { verificationID: id };
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
            alert('Fehler. Verifikation konnte nicht durchgeführt werden.');
            document.querySelector('#div').remove();
            window.location.href = 'login.html'
        } else {
            //alert('20. Critical Success!');
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
} else {
    alert('ID Parameter fehlt.');
    document.querySelector('#div').remove();
    window.location.href = 'login.html'
}
