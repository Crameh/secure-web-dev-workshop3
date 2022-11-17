// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const { default: mongoose } = require('mongoose')
const Location = require('./locations.model')
const locationsService = require('./locations.service')

router.get('/', (req, res) => {
	return res.status(200).send("Hello World")
})

router.get('/locations', async(req, res) => {
    const locations = await Location.find()
    return res.status(200).send(locations)
})

router.get('/locations/:id', async(req,res) =>{
    const locations = await locationsService.findOne(req.params['id'])
    return res.status(200).send(locations)
})

router.post('/locations', async (req,res, next) =>{
    const locations = await locationsService.addLocation({...req.body, endDate:new Date(req.body.endDate), startDate: new Date(req.body.startDate)})
    return res.status(201).send(locations)
})

router.delete('/locations/:id', async (req,res)=>{
    const location = await locationsService.deleteById(req.params.id)
    return res.status(200).send(location)
})
router.put('/locations/:id', async (req,res)=>{
    const location = await locationsService.updateLocation(req.params.id, {...req.body, endDate:new Date(req.body.endDate), startDate: new Date(req.body.startDate)})
    return res.status(200).send(location)
})

module.exports = router
