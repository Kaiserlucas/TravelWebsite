import { MapContainer, GeoJSON } from 'react-leaflet';
import React, { useState } from 'react';
import './style.css';
import { getTrips } from '../../utils/api';
import { useEffect } from 'react';
import worldmap from '../../ressources/worldmap.json';
import KartePopup from '../KartePopup/KartePopup';

export default function Karte() {
  // const [jsonData, setJsonData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [clickedCountry, setClickedCountry] = useState("");
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

  function besuchteLänder(feature) {
    for (const visitedCountry of countries) {
      if (feature.properties.ADMIN === visitedCountry) {
        return 'purple';
      }
    }
  }

  function onEachFeature(feature, layer) {
    layer.on({
      click: clickToFeature.bind(this),
    });
  }

  function clickToFeature(e) {
    var layer = e.target;
    console.log('I clicked on ', layer.feature.properties.ADMIN);
    setPopupVisible(true);
    setClickedCountry(layer.feature.properties.ADMIN);
  }

  return (
    <>
      <MapContainer className="map" center={[0, 0]} zoom={3}>
        <KartePopup visible={popupVisible} clickedCountry={clickedCountry} />

        <GeoJSON
          data={worldmap.features}
          style={(feature) => ({
            stroke: false,
            weight: 2,
            color: 'gray',
            fill: true,
            fillColor: besuchteLänder(feature),
            fillOpacity: 1,
          })}
          onEachFeature={onEachFeature.bind(this)}
        />
      </MapContainer>
    </>
  );
}
