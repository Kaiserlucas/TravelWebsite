import { getTrips, deleteTrip, saveTrip, editTrip, getJson } from './api.js';
import Trip from './Trip.js';

const data = await getJson('../resources/countries.geojson');

const createCountryDropdown = async (data, element) => {
  for (const country of data.features) {
    const dropdownElement = document.createElement('option');
    dropdownElement.value = country.properties.ADMIN;
    dropdownElement.text = country.properties.ADMIN;
    element.appendChild(dropdownElement);
  }
};
createCountryDropdown(data,document.querySelector('#destination'));

const displayData = async () => {
  const yourTrips = document.querySelector('.yourtrips');
  const trips = await getTrips();

  //Clear all existing trips
  while (yourTrips.firstChild) {
    yourTrips.removeChild(yourTrips.lastChild);
  }

  //Add new trips to page
  trips.forEach((trip) => {
    console.log(trip);
    const div = document.createElement('div');
    div.className = 'trip';
    div.id = trip.uuid;
    yourTrips.appendChild(div);

    const name = document.createElement('h3');
    name.innerText = trip.name;
    name.className = 'trip-element name';
    div.appendChild(name);

    const destination = document.createElement('p');
    destination.innerText = trip.destination;
    destination.className = 'trip-element destination';
    div.appendChild(destination);

    const date = document.createElement('p');
    date.innerText = trip.startdate + ' - ' + trip.enddate;
    console.log();
    date.className = 'trip-element date';
    div.appendChild(date);

    //Buttons
    const formEdit = document.createElement('form');
    formEdit.setAttribute('action', 'reisen.html');

    const formDelete = document.createElement('form');
    formDelete.setAttribute('action', 'reisen.html');

    const buttonEdit = document.createElement('button');
    buttonEdit.setAttribute('type', 'submit');
    buttonEdit.innerText = 'Bearbeiten';
    buttonEdit.className = 'trip-element editButton';

    const buttonDelete = document.createElement('button');
    buttonDelete.setAttribute('type', 'submit');
    buttonDelete.innerText = 'Entfernen';
    buttonDelete.className = 'trip-element deleteButton';

    formEdit.appendChild(buttonEdit);
    formDelete.appendChild(buttonDelete);
    div.appendChild(formEdit);
    div.appendChild(formDelete);

    buttonEdit.addEventListener('click', makeTripEditable, false);

    buttonDelete.addEventListener('click', removeTrip, false);
  });

  async function removeTrip(evt) {
    await deleteTrip(evt.target.parentNode.parentNode.id);
    await displayData();
  }

  function makeTripEditable(evt) {
    const parent = evt.target.parentNode.parentNode;

    const editForm = document.createElement('form');
    const tripnameInput = document.createElement('input');
    const destinationInput = document.createElement('select');
    const startdateInput = document.createElement('input');
    const enddateInput = document.createElement('input');
    const submitButton = document.createElement('input');
    const cancelButton = document.createElement('input');

    /**
        const tripnameLabel = document.createElement('label');
        const destinationLabel = document.createElement('label');
        const startdateLabel = document.createElement('label');
        const enddateLabel = document.createElement('label');

        tripnameLabel.setAttribute("for","editTripname");
        destinationLabel.setAttribute("for","editDestination");
        startdateLabel.setAttribute("for","editStartdate");
        enddateLabel.setAttribute("for","editEnddate");

        tripnameLabel.innerText = "Name der Reise";
        destinationLabel.innerText = "Wo soll es hingehen?";
        startdateLabel.innerText = "Wann soll es losgehen?";
        enddateLabel.innerText = "Wann wieder zurück?";

        tripnameLabel.className = "trip-element";
        destinationLabel.className = "trip-element";
        startdateLabel.className = "trip-element";
        enddateLabel.className = "trip-element";
         **/

    tripnameInput.setAttribute('type', 'text');
    startdateInput.setAttribute('type', 'date');
    enddateInput.setAttribute('type', 'date');
    submitButton.setAttribute('type', 'submit');
    cancelButton.setAttribute('type', 'submit');

    tripnameInput.setAttribute('name', 'editTripname');
    destinationInput.setAttribute('name', 'editDestination');
    startdateInput.setAttribute('name', 'editStartdate');
    enddateInput.setAttribute('name', 'editEnddate');
    tripnameInput.setAttribute('required', 'required');
    destinationInput.setAttribute('required', 'required');
    startdateInput.setAttribute('required', 'required');
    enddateInput.setAttribute('required', 'required');

    tripnameInput.className = 'trip-element nameInput';
    destinationInput.className = 'trip-element destinationInput';
    startdateInput.className = 'trip-element startdateInput';
    enddateInput.className = 'trip-element enddateInput';
    submitButton.className = 'trip-element submitButton';
    cancelButton.className = 'trip-element cancelButton';

    //Get previous values
    tripnameInput.value = parent.querySelector('.name').innerText;

    const date = parent.querySelector('.date').innerText.split(' ');
    startdateInput.value = date[0];
    enddateInput.value = date[2];

    submitButton.value = 'Speichern';
    cancelButton.value = 'Abbruch';
    cancelButton.addEventListener('click', () => {
      displayData();
    });

    //editForm.appendChild(tripnameLabel);
    editForm.appendChild(tripnameInput);
    //editForm.appendChild(destinationLabel);
    editForm.appendChild(destinationInput);
    //editForm.appendChild(startdateLabel);
    editForm.appendChild(startdateInput);
    //editForm.appendChild(enddateLabel);
    editForm.appendChild(enddateInput);
    editForm.appendChild(submitButton);

    createCountryDropdown(data,destinationInput);
    destinationInput.value = parent.querySelector('.destination').innerText;

    editForm.addEventListener('submit', () => {
      const id = parent.id;
      const editedName = parent.querySelector('.nameInput').value;
      const editedDestination = parent.querySelector('.destinationInput').value;
      const editedStart = parent.querySelector('.startdateInput').value;
      const editedEnd = parent.querySelector('.enddateInput').value;

      editTrip(
        new Trip(id, editedName, editedDestination, editedStart, editedEnd)
      ).then(() => {
        displayData();
      });
    });

    while (parent.firstChild) {
      parent.removeChild(parent.lastChild);
    }

    parent.appendChild(editForm);
    parent.appendChild(cancelButton);
  }
};

function init() {
  const createButton = document.querySelector('#createform');
  createButton.addEventListener('submit', () => {
    const name = document.querySelector('#travelname');
    const destination = document.querySelector('#destination');
    const start = document.querySelector('#startdate');
    const end = document.querySelector('#enddate');
    const trip = new Trip(
      1,
      name.value,
      destination.value,
      start.value,
      end.value
    );
    saveTrip(trip).then(() => {
      window.location.reload();
      displayData();
    });
  });

  displayData();
}

init();
