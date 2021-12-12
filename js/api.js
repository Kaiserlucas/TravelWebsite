// api.js
async function getJson(url) {
  const response = await fetch('../resources/countries.geojson');
  return response.json();
}

function handleResponse(res) {
  if(res.message === 'Bad email or password') {
    window.location.href = 'login.html';
  } else {
    console.log(res.message)
  }
}

const getTrips = async () => {
  const response = await fetch(
    'https://webdevelopment-travelsite.herokuapp.com/trips',{credentials: 'include'}
  ).then((res)=>handleResponse(res));
  return await response.json();
};

const saveTrip = async (trip) => {
  const content = { name: trip.tripName, destination: trip.destination, startDate: trip.start, endDate: trip.end };
  const json = JSON.stringify(content);

  const fetchParams = {
    headers: {
      'content-type': 'application/json',
    },
    body: json,
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
  };
  fetch('https://webdevelopment-travelsite.herokuapp.com/trips', fetchParams)
    .then((data) => {
      return data.json();
    })
    .then((res) => handleResponse(res))
    .catch((error) => console.log(error));
};

const deleteTrip = async (uuid) => {
  const content = { uuid: uuid };
  const json = JSON.stringify(content);

  const fetchParams = {
    headers: {
      'content-type': 'application/json',
    },
    body: json,
    method: 'DELETE',
    mode: 'cors',
    credentials: 'include',
  };
  fetch(
    `https://webdevelopment-travelsite.herokuapp.com/trips`,
    fetchParams
  )
    .then((data) => {
      return data.json();
    })
    .then((res) => handleResponse(res))
    .catch((error) => console.log(error));
};

const editTrip = async (trip) => {
  await deleteTrip(trip.uuid);
  await saveTrip(trip);
};

export { getTrips, deleteTrip, saveTrip, editTrip, getJson };
