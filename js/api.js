// api.js
async function getJson(url) {
  const response = await fetch('../resources/countries.geojson');
  return response.json();
}

const getTrips = async () => {
  const response = await fetch(
    'https://webdevelopment-travelsite.herokuapp.com/trips'
  );
  const data = await response.json();
  return data['trips'];
};

const saveTrip = async (trip) => {
  const fetchParams = {
    headers: {
      'content-type': 'application/json',
    },
    body: trip,
    method: 'POST',
    mode: 'cors',
  };
  fetch('https://webdevelopment-travelsite.herokuapp.com/trips', fetchParams)
    .then((data) => {
      return data.json();
    })
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
};

const deleteTrip = async (uuid) => {
  const fetchParams = {
    headers: {
      'content-type': 'application/json',
    },
    body: uuid,
    method: 'POST',
    mode: 'cors',
  };
  fetch(
    `https://webdevelopment-travelsite.herokuapp.com/trips/${uuid}`,
    fetchParams
  )
    .then((data) => {
      return data.json();
    })
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
};

const editTrip = async (trip) => {
  await deleteTrip(trip.uuid);
  await saveTrip(trip);
};

export { getTrips, deleteTrip, saveTrip, editTrip, getJson };
