import React from 'react';
import './style.css'


export default function Reisekarten({ reisekarten }) {
  return (
    <div>
      <div className="ballon">
        <h2 className="traveltext">Ihre Reisen</h2>
        <div className="yourtrips"></div>
      </div>
    </div>
  );
}
