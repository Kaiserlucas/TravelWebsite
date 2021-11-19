import { getTrips, getJson } from './api.js';

const visitedCountries = async () => {
  const countriePromises = await getTrips();
  const countries = [];
  for (const [i, trip] of countriePromises.entries()) {
    countries[i] = trip.destination;
  }
  return countries;
};

const countries = await visitedCountries();
const myCustomStyle = {
  stroke: false,
  fill: true,
  fillColor: '#000',
  fillOpacity: 1,
};

const data = await getJson('../resources/countries.geojson');
const map = L.map('map').setView([0, 0], 3);
L.geoJSON(data, {
  clickable: true,
  style: myCustomStyle,
  style: function (feature) {
    for (const country of countries) {
      switch (feature.properties.ADMIN) {
        case country:
          return {
            fillColor: '#000',
          };
      }
    }
  },
}).addTo(map);
