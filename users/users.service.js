const bcrypt = require("bcrypt"); // import bcrypt to hash passwords
const jwt = require("jsonwebtoken"); // import jwt to sign tokens
const User = require('./users.model')
require('dotenv').config()

async function findAll () {
	const users = await User.find()
    return users
}

async function checkPassword(username, password) {
    const user = await User.findOne({username})
    if (!user) throw new Error("No user")
    console.log(password)
    console.log(user.password)
    /*const match = await bcrypt.compareSync(password, user.password)
    if (!match) return false
    return true*/
    return await bcrypt.compareSync(password, user.password)
}

async function register(data) {
    try{
        const salt = await bcrypt.genSalt();
        data.password = await bcrypt.hash(data.password, salt);
        const user = new User(data)
        await generateAuthTokenAndSaveUser(user);
        return user.save()
    } catch(e) {
        throw new Error("Beurk")
    }
}

async function generateAuthTokenAndSaveUser(user) {
    const authToken = jwt.sign({ sub : user._id.toString() }, process.env.JWT_SECRET)
    user.authToken = authToken
    await user.save();
    return authToken;
}

module.exports = [
    register, 
    findAll,
    checkPassword,
    generateAuthTokenAndSaveUser
]

module.exports.register = register;
module.exports.findAll = findAll;
module.exports.checkPassword = checkPassword;