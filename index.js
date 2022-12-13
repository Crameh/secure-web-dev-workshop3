const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
require('dotenv').config()
const locationController = require('./locations/locations.controller')
const userController = require('./users/users.controller')
const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(locationController)
app.use(userController)
app.use(passport.initialize())

app.listen(port, async () => {
    const result = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected with success");
    console.log(`API listening on port ${port}, visit http://localhost:${port}/`)
})