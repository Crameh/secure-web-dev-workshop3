const bcrypt = require("bcrypt"); // import bcrypt to hash passwords
const jwt = require("jsonwebtoken"); // import jwt to sign tokens
const User = require('./users.model')

async function findAll () {
	const users = await User.find()
    return users
}

async function checkPassword(username, password) {
    const user = await User.findOne({username})
    if (!user) throw new Error("No user")
    const match = await bcrypt.compare(password, user.password)
    if (!match) throw new Error("Bad password")
    return user
}

async function register(data) {
    try{
        const salt = await bcrypt.genSalt();
        data.password = await bcrypt.hash(data.password, salt);
        const user = new User(data)
        return user.save()
    } catch(e) {
        throw new Error("Beurk")
    }
}

module.exports.register = register;
module.exports.findAll = findAll;
module.exports.checkPassword = checkPassword;