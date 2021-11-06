
import {getTrips,deleteTrip,saveTrip,editTrip} from "./api.js";

const displayData = async () => {
    const trips = await getTrips();
    const yourTrips = document.querySelector(".yourTrips");
    trips.forEach(trip => {

        const div = document.createElement('div');
        div.className = "trip";
        yourTrips.appendChild(div);

        const name = document.createElement('h3');
        name.innerText = trip.tripName;
        name.className = "trip-element";
        div.appendChild(name);

        const destination = document.createElement('p');
        destination.innerText = trip.destination;
        destination.className = "trip-element";
        div.appendChild(destination);

        const date = document.createElement('p');
        date.innerText = trip.start+" - "+trip.end;
        date.className = "trip-element";
        div.appendChild(name);

        //TODO: Add edit and delete buttons

    })
}

displayData();