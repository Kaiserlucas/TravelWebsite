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
    createCountryDropdown(
      worldmap,
      document.querySelector('#destinationpopup')
    );
  })
  
  return (
    <>
      {visible ? (
        <div className="createtrippopup">
          <form
            action=""
            id="createformpopup"
            onSubmit={() => {
              return false;
            }}
          >
            <label htmlFor="travelnamepopup">Reisename</label>
            <input
              type="text"
              id="travelnamepopup"
              name="travelnamepopup"
              required
            />
            <label htmlFor="destinationpopup">Reiseziel</label>
            <select id="destinationpopup" name="destinationpopup"></select>
            <label htmlFor="startdatepopup">Startdatum</label>
            <input
              type="date"
              id="startdatepopup"
              name="startdatepopup"
              required
            />
            <label htmlFor="enddatepopup">Enddatum</label>
            <input type="date" id="enddatepopup" name="enddatepopup" required />
            <input type="submit" id="createbuttonpopup" value="Los" />
          </form>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
