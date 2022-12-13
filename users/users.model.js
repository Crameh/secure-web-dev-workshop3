require('dotenv').config();
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	username: {type:String, required: true, unique: true},
  password: {type:String, required: true},
  authToken: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User

