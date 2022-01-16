import React from 'react';
import './style.css';
import { getTrips, getJson } from '../../utils/api';
import { useEffect } from 'react';

export default function Karte() {
  useEffect(() => {
    const scriptTag = document.createElement('script');
    scriptTag.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
    scriptTag.integrity =
      'sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==';
    scriptTag.crossOrigin = '';
    scriptTag.addEventListener('load', () => {
      console.log('loaded');
      wrapperFunction();
    });
    document.body.appendChild(scriptTag);
  }, []);

  const visitedCountries = async () => {
    const countriePromises = await getTrips();
    if (
      countriePromises.message === 'You need to be logged in to see this page.'
    ) {
      window.location.href = 'login.html';
    }
    const countries = [];
    for (const [i, trip] of countriePromises.entries()) {
      countries[i] = trip.destination;
    }
    return countries;
  };

  const wrapperFunction = async () => {
    const L = ""
      const data = await getJson('../../ressources/countries.geojson');
      const map = L.map('map').setView([0, 0], 3);
    const countries = await visitedCountries();

    
    console.log("here");
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
            case 'Antarctica':
              return {
                fill: false,
              };
          }
        }
      },
    }).addTo(map);

    let osm = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        noWrap: true,
      }
    );
    osm.addTo(map);
  };
  wrapperFunction();
  return <div id="map">Test</div>;
}
