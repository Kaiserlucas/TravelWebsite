import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import React, { useState } from 'react';
import './style.css';
import { getTrips, getJson } from '../../utils/api';
import { useEffect } from 'react';

export default function Karte() {
  const [jsonData,setJsonData] = useState([]);
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    async function wrapper() {
      const data = await getJson(
        'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson'
      );
      setJsonData(data);
    }
    const visitedCountries = async () => {
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
      const temp = await visitedCountries();
      setCountries(temp);
    }
    wrapper();
    wrapper2();
  },[]);
 console.log(`JSON ${jsonData}`);
 console.log(`Countries: ${countries}`);

  return (
    <MapContainer center={[51.505, -0.09]} zoom={3} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        data={jsonData}
        style={(feature) => {
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
        }}
      ></GeoJSON>
    </MapContainer>
  );
}
