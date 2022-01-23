import { useEffect } from 'react';
import './style.css';
import worldmap from '../../ressources/worldmap.json'
import { saveTrip } from '../../utils/api';
import Trip from '../Trip/Trip';
import createCountryDropdown from '../NeueReisen/NeueReisen';



export default function KartePopup({visible}) {
  useEffect(() => {
    createCountryDropdown(
      worldmap,
      document.querySelector('#destinationpopup')
    );
      function init() {
        const createButton = document.querySelector('#createformpopup');
        createButton.addEventListener('submit', () => {
          const name = document.querySelector('#travelnamepopup');
          const destination = document.querySelector('#destinationpopup');
          const start = document.querySelector('#startdatepopup');
          const end = document.querySelector('#enddatepopup');
          const trip = new Trip(
            1,
            name.value,
            destination.value,
            start.value,
            end.value
          );
          name.value = '';
          destination.value = '';
          start.value = '';
          end.value = '';
          saveTrip(trip);
        });
      }
      if(visible){
      init();

      }
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
