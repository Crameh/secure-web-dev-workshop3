require('dotenv').config();
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	username: {type:String, required: true, unique: true},
    password: {type:String, required: true}
})

userSchema.methods.matchPassword = async function (password) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      throw new Error(error);
    }
   };

const User = mongoose.model('User', userSchema)

module.exports = User
module.exports.matchPassword = this.matchPassword
