// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')

async function findAll () {
	const locations = await Location.find()
    if (!locations) throw new Error("Locations not found")
    return locations
}
async function findOne(id){   
    const location = await Location.findById(id);
    if (!location) throw new Error("Location not found")
    return location
}

async function addLocation(data){
    if (!data) throw new Error("Data null")
    const instance = new Location(data)
    return instance.save()
}

async function deleteByID(id){
    const location = await Location.findById(id);
    if (!location) throw new Error("Location not found")
    return location.remove()
}

async function updateLocation(id, update){
    return Location.updateOne({ _id: id }, update);
}

module.exports.updateLocation = updateLocation;
module.exports.findOne = findOne
module.exports.findAll = findAll
module.exports.addLocation = addLocation;
module.exports.deleteById = deleteByID;