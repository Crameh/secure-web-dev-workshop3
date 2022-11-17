const express = require('express')
const locationController = require('./locations/locations.controller')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(locationController)
const mongoose = require('mongoose')
require('dotenv').config()

app.listen(port, async () => {
    const result = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected with success");
    console.log(`API listening on port ${port}, visit http://localhost:${port}/`)
})