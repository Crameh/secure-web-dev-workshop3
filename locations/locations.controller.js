// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const { default: mongoose } = require('mongoose')
const Location = require('./locations.model')
const locationsService = require('./locations.service')
const User = require('../users/users.model');
const userService = require('../users/users.service');
const passport = require('passport');
require('../strategies/local.js');

const roleMiddleware = (allowedRoles) => (req, res, next) => allowedRoles.includes(req.user?.role) ? next() : res.status(403).send()

router.get('/', (req, res) => {
	return res.status(200).send("Hello World")
})

router.get('/locations', passport.authenticate('jwt', {session: false}), roleMiddleware(['admin']), async(req, res) => {
    try {
        const locations = await Location.find()
        return res.status(200).send(locations)
    } catch (e) {
        if (e.message === "Locations not found") return res.status(404).send("Error 404, Locations not found :/")
        return res.status(400).send("Bad Request, Try again !")
    }
})

router.get('/locations/:id', passport.authenticate('jwt', {session: false}), roleMiddleware(['admin']), async(req,res) =>{
    try {
        const location = await locationsService.findOne(req.params['id'])
        return res.status(200).send(location) 
    } catch (e) {
        if (e.message === "Location not found") return res.status(404).send("Error 404, Location not found :(")
        return res.status(400).send("Bad Request, Try again !")
    }
})

router.post('/locations', passport.authenticate('jwt', {session: false}), roleMiddleware(['admin']), async (req,res, next) =>{
    try {
        const locations = await locationsService.addLocation({...req.body})
        return res.status(201).send(locations)
    } catch (e) {
        if (e.message === "Missing film name") return res.status(400).send("The film name is not here, how am I supposed to add this")
        return res.status(400).send("Bad Request, Try again !")
    }
})

router.delete('/locations/:id', passport.authenticate('jwt', {session: false}), roleMiddleware(['admin']), async (req,res)=>{
    try{
        const location = await locationsService.deleteById(req.params.id)
        return res.status(200).send(location)
    } catch(e) {
        return res.status(400).send("Bad Request, Try again !")
    }
})
router.put('/locations/:id', passport.authenticate('jwt', {session: false}), roleMiddleware(['admin']), async (req,res)=>{
    try {
        const location = await locationsService.updateLocation(req.params.id, {...req.body, endDate:new Date(req.body.endDate), startDate: new Date(req.body.startDate)})
        return res.status(200).send(location)
    } catch(e) {
        return res.status(400).send("Bad Request, Try again !")
    }
})

module.exports = router
