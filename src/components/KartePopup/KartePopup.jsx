import { useEffect } from 'react';
import './style.css';
import worldmap from '../../ressources/worldmap.json'
export default function KartePopup({visible}) {
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
  })
  return (
    <>
      {visible ? (
        <div className="createtrip">
          <form
            action=""
            id="createform"
            onSubmit={() => {
              return false;
            }}
          >
            <label htmlFor="travelname" >Reisename</label>
            <input type="text" id="travelname" name="travelname" required />
            <label htmlFor="destination">Reiseziel</label>
            <select id="destination" name="destination"></select>
            <label htmlFor="startdate">Startdatum</label>
            <input type="date" id="startdate" name="startdate" required />
            <label htmlFor="enddate">Enddatum</label>
            <input type="date" id="enddate" name="enddate" required />
            <input type="submit" id="createbutton" value="Los" />
          </form>
        </div>
      ) : (
        ''
      )}
      </>
  );
}
