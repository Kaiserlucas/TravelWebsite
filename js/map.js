import {getTrips, getJson, saveTrip} from './api.js';
import Trip from "./Trip.js";

const popupForm = document.getElementById("popupForm");
const name = document.getElementById("name");
const destination = document.getElementById("destination");
const startdate = document.getElementById("startdate");
const enddate = document.getElementById("enddate");
const saveForm = document.getElementById("saveForm");

let currentCountry;

const init = async () => {
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
    onEachFeature: onEachFeature,
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
}

function click(e) {
  currentCountry = e;
  const country = e.target.feature.properties.ADMIN;
  console.log(country);
  popupForm.style.display = "block";

  name.value = ""
  destination.value = country;
  destination.disabled = true;
  startdate.value = "";
  enddate.value = "";
}

function onEachFeature(feature, layer) {
  layer.on({
    click: click,
  });
}

saveForm.addEventListener('submit', () => {
  popupForm.style.display = "none";
  const trip = new Trip(
      1,
      name.value,
      destination.value,
      startdate.value,
      enddate.value
  );
  currentCountry.fill = false;
  saveTrip(trip).then(() => {
    console.log("done")
  });
});

await init();