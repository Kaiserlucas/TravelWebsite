// api.js
const getTrips = async () => {
    return JSON.parse(localStorage.getItem('trips')) || []
}

const saveTrip = async (trip) => {
    let oldTrips = await getTrips();

    //Set id for trip
    let ids = oldTrips.map(X=>X.id);
    if(ids.length === 0) {
        trip.id = 1;
    } else {
        trip.id = Math.max(...ids)+1
    }

    oldTrips.push(trip);
    localStorage.setItem("trips",JSON.stringify(oldTrips))
}

const deleteTrip = async (id) =>{
    const oldTrips = await getTrips();
    const newTrips = oldTrips.filter(X=>X.id !== parseInt(id));
    localStorage.setItem("trips",JSON.stringify(newTrips))
}

const editTrip = async (trip) =>{
    await deleteTrip(trip.id);
    await saveTrip(trip)
}

export {getTrips,deleteTrip,saveTrip,editTrip}
