
import {getTrips,deleteTrip,saveTrip,editTrip} from "./api.js";
import Trip from './Trip.js';

const displayData = async () => {
    const trips = await getTrips();
    const yourTrips = document.querySelector(".yourtrips");

    //Clear all existing trips
    while (yourTrips.firstChild) {
        yourTrips.removeChild(yourTrips.lastChild);
    }

    //Add new trips to page
    trips.forEach(trip => {

        const div = document.createElement('div');
        div.className = "trip";
        div.id = trip.id;
        yourTrips.appendChild(div);

        const name = document.createElement('h3');
        name.innerText = trip.tripName;
        name.className = "trip-element name";
        div.appendChild(name);

        const destination = document.createElement('p');
        destination.innerText = trip.destination;
        destination.className = "trip-element destination";
        div.appendChild(destination);

        const date = document.createElement('p');
        date.innerText = trip.start+" - "+trip.end;
        console.log()
        date.className = "trip-element date";
        div.appendChild(date);

        //Buttons
        const formEdit = document.createElement('form');
        formEdit.setAttribute("action","reisen.html");

        const formDelete = document.createElement('form');
        formDelete.setAttribute("action","reisen.html");

        const buttonEdit = document.createElement('button');
        buttonEdit.setAttribute("type","submit");
        buttonEdit.innerText = "Bearbeiten";
        buttonEdit.className = "trip-element editButton";

        const buttonDelete = document.createElement('button');
        buttonDelete.setAttribute("type","submit");
        buttonDelete.innerText = "Entfernen";
        buttonDelete.className = "trip-element deleteButton";

        formEdit.appendChild(buttonEdit);
        formDelete.appendChild(buttonDelete);
        div.appendChild(formEdit);
        div.appendChild(formDelete);

        buttonEdit.addEventListener("click", () => {
            //TODO
            //this.closest(".name").outerHTML = "<input type=\"text\" id=\"travelname\" name=\"travelname\" />"
        })

        buttonDelete.addEventListener('click', removeTrip, false);

    })

    function removeTrip(evt) {
        deleteTrip(evt.target.parentNode.parentNode.id).then(() => {
            displayData();
        })
    }
}

function init() {
    const createButton = document.querySelector("#createbutton");
    createButton.addEventListener("click", () => {
        const name = document.querySelector("#travelname");
        const destination = document.querySelector("#destination");
        const start = document.querySelector("#startdate");
        const end = document.querySelector("#enddate");
        const trip = new Trip(1,name.value,destination.value,start.value,end.value);
        saveTrip(trip)
    })

    displayData();
}

init();