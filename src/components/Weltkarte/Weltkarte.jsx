import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import React, { useState } from 'react';
import './style.css';
import { getTrips, getJson } from '../../utils/api';
import { useEffect } from 'react';

export default function Karte() {
console.log();
  return (
    <MapContainer center={[51.505, -0.09]} zoom={3} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        data={JSONResult}
        style={(feature) => {
          for (const country of JSONResult) {
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
