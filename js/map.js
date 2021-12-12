import { getTrips, getJson } from './api.js';

const visitedCountries = async () => {

  const countriePromises = await getTrips();
  if(countriePromises.message === 'You need to be logged in to see this page.') {
    window.location.href = 'login.html';
  }
  const countries = [];
  for (const [i, trip] of countriePromises.entries()) {
    countries[i] = trip.destination;
  }
  return countries;
};

const countries = await visitedCountries();

const data = await getJson('../resources/countries.geojson');
const map = L.map('map').setView([0, 0], 3);
L.geoJSON(data, {
  clickable: true,
  stroke: false,
  fill: true,
  fillColor: '#B0B0B0',
  fillOpacity: 1,
  style: function (feature) {
    for (const country of countries) {
      switch (feature.properties.ADMIN) {
        case country:
          return {
            fill: false,
          };
        case "Antarctica":
          return {
            fill: false,
          };
      }
    }
  },
}).addTo(map);

let osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  noWrap: true,
});
osm.addTo(map);
