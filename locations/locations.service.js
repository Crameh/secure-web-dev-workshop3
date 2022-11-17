// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')

function findAll () {
	return Location.find()
}
function findOne(id){
    return Location.findById(id);
}

function addLocation(data){
    const instance = new Location(data)
    instance.save()
}


function deleteByID(id){
    return Location.findOneAndDelete( {_id : id});
}


function updateLocation(id, update){
    return Location.updateOne({ _id: id }, update);
}

module.exports.updateLocation = updateLocation;
module.exports.findOne = findOne
module.exports.findAll = findAll
module.exports.addLocation = addLocation;
module.exports.deleteById = deleteByID;