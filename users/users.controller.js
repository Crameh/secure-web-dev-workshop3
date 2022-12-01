const router = require('express').Router();
const { default: mongoose } = require('mongoose');
const User = require('./users.model');
const userService = require('./users.service');
const passport = require('passport');
require('../strategies/local.js');

router.get('/users', async (req, res) => {
	try {
        const users = await userService.findAll()
        return res.status(200).send(users)
    } catch (e) {
        return res.status(400).send("Bad Request, Try again !")
    }
});

router.get('/users/:id', (req, res) => {
	return res.status(200).send("Get one user")
});

router.post('/users/register', async (req, res) => {
    try {
        const user = await userService.register(req.body);
        return res.status(200).send(user);
    } catch(e) {
        return res.status(400).send("Bad Request, Try again !")
    }
    
});

router.post('/users/login', passport.authenticate('local', {session : false, successRedirect : './users'}));
//router.post('/users/login', async(req, res) => res.status(200).send(await userService.checkPassword(req.body.username, req.body.password)))

router.put('/users/:id', (req, res) => {
	return res.status(200).send("Put user")
});

router.patch('/users/:id', (req, res) => {
	return res.status(200).send("Patch user")
});

router.delete('/users/:id', (req, res) => {
	return res.status(200).send("Delete user")
});

module.exports = router