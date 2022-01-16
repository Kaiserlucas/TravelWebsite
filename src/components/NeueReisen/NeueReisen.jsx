import React from 'react'
import './style.css'

export default function NeueReisen() {
    return (
      <div>
        <div className="createtrip">
          <h2 className="traveltext">Fügen Sie eine Reise hinzu</h2>

          <form action="" id="createform" onsubmit="return false;">
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
        
      </div>
    );
}
