import React, { useEffect, useState } from 'react';
import './style.css';
import worldmap from '../../ressources/worldmap.json';
import Reisekarten from '../Reisekarten/Reisekarten';

export default function NeueReisen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const createCountryDropdown = async (worldmap, element) => {
      for (const country of worldmap.features) {
        const dropdownElement = document.createElement('option');
        dropdownElement.value = country.properties.ADMIN;
        dropdownElement.text = country.properties.ADMIN;
        element.appendChild(dropdownElement);
      }
    };
    createCountryDropdown(worldmap, document.querySelector('#destination'));
    setLoading(false);
  });
  return (
    <div>
      <div className="createtrip">
        <h2 className="traveltext">Fügen Sie eine Reise hinzu</h2>
        <form
          action=""
          id="createform"
          onSubmit={() => {
            return false;
          }}
        >
          <label htmlFor="travelname">Name der Reise</label>
          <input type="text" id="travelname" name="travelname" required />
          <label htmlFor="destination">Wo soll es hingehen?</label>
          <select id="destination" name="destination"></select>
          <label htmlFor="startdate">Wann soll es losgehen?</label>
          <input type="date" id="startdate" name="startdate" required />
          <label htmlFor="enddate">Wann wieder zurück?</label>
          <input type="date" id="enddate" name="enddate" required />
          <input type="submit" id="createbutton" value="Los" />
        </form>
      </div>
      <div>
        <div className="ballon">
          <h2 className="traveltext">Ihre Reisen</h2>
          <div className="yourtrips"></div>
        </div>
      </div>
      {loading ? '' : <Reisekarten />}
    </div>
  );
}
