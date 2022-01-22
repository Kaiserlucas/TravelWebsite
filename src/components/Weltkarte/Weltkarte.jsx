import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import React, { useState } from 'react';
import './style.css';
import { getTrips, getJson } from '../../utils/api';
import { useEffect } from 'react';
import worldmap from '../../ressources/worldmap.json';

export default function Karte() {
  // const [jsonData, setJsonData] = useState([]);
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const visitedCountries = async () => {
      console.log('Trips werden gefetcht');

      const countriePromises = await getTrips();
      if (
        countriePromises.message ===
        'You need to be logged in to see this page.'
      ) {
        window.location.href = 'login.html';
      }
      const countries = [];
      for (const [i, trip] of countriePromises.entries()) {
        countries[i] = trip.destination;
      }
      return countries;
    };

    async function wrapper2() {
      console.log('Visited countries werden gefetched');
      const temp = await visitedCountries();
      setCountries(temp);
    }
    wrapper2();
  }, []);

  function besuchteLänder() {
    for (const country of worldmap.features) {
      console.log(country.properties.ADMIN);
    }
    for (const country of worldmap.features) {
      for (const visitedCountry of countries) {
        if (country.properties.ADMIN === visitedCountry) {
          return 'black';
        } else if (country.properties.ADMIN === 'Australia') {
          return 'purple';
        } else {
          console.log(country.properties.ADMIN);
          return 'red';
        }
      }
    }
  }

  return (
    <div>
      <MapContainer className="map" center={[0, 0]} zoom={3}>
        <GeoJSON
          data={worldmap.features}
          style={(current) => ({
            weight: 1,
            color: 'gray',
            fill: true,
            fillColor: besuchteLänder(),
            fillOpacity: 1,
          })}
        />
      </MapContainer>
    </div>
  );
}
