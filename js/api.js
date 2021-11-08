// api.js
const getTrips = async () => {
    return JSON.parse(localStorage.getItem('trips')) || []
}

const saveTrip = async (trip) => {
    let oldTrips = await getTrips();
    //TODO: We probably want to calculate the new ID here later
    oldTrips.push(trip);
    localStorage.setItem("trips",JSON.stringify(oldTrips))
}

const deleteTrip = async (id) =>{
    const oldTrips = await getTrips();
    const newTrips = oldTrips.filter(X=>X.id === id);
    localStorage.setItem("trips",JSON.stringify(newTrips))
}

const editTrip = async (trip) =>{
    await deleteTrip(trip.id);
    await saveTrip(trip)
}

export {getTrips,deleteTrip,saveTrip,editTrip}
