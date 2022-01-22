import { MapContainer, TileLayer, Marker, Popup, GeoJSON} from 'react-leaflet';
import React, { useState } from 'react';
import './style.css';
import { getTrips, getJson } from '../../utils/api';
import { useEffect } from 'react';

export default function Karte() {
  const [jsonData,setJsonData] = useState([]);
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    async function wrapper() {
      console.log("Json wird gefetched");
      const data = await getJson(
        'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson'
      );
      setJsonData(data);
    }
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
    wrapper();
    wrapper2();
  },[]);
 console.log(`JSON ${jsonData}`);
 console.log(`Countries: ${countries}`);

  
  return (
    
    <div className="mapdata-container">
      <MapContainer
        className="map"
        style={{ height: '100vh', width: '100vw' }}
        center={[0, 0]}
        zoom={3}
      >
        <GeoJSON data={jsonData} style={{ color: 'purple' }} />
      </MapContainer>
    </div>
  );
}
