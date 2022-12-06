require('dotenv').config();
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	username: {type:String, required: true, unique: true},
  password: {type:String, required: true},
  authToken: {
    type: String,
    required: true
  }
})

const matchPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};



const User = mongoose.model('User', userSchema)

module.exports = User
module.exports.matchPassword = this.matchPassword
module.exports.generateAuthTokenAndSaveUser = this.generateAuthTokenAndSaveUser
