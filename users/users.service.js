const bcrypt = require("bcrypt"); // import bcrypt to hash passwords
const jwt = require("jsonwebtoken"); // import jwt to sign tokens
const { get } = require("mongoose");
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

async function getUser(id) {
    const userInfo = await User.findOne({_id: id})
    if (!userInfo) return userInfo
}

async function updateUser(id, property) {
    try {
        property.role = null
        await User.findOneAndUpdate({_id: id}, property);
        return await getUser(id);
    } catch(e) {
        return null;
    }
}

async function deleteUser(id) {
    try {
        await User.findByIdAndDelete(id);
        return "User deleted ! It is too late mate..."
    } catch(e) {
        return null
    }
}

module.exports = [
    register, 
    findAll,
    getUser,
    generateAuthTokenAndSaveUser,
    checkPassword,
    updateUser,
    deleteUser
]

module.exports.register = register;
module.exports.findAll = findAll;
module.exports.checkPassword = checkPassword;
module.exports.getUser = getUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;