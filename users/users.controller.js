const router = require('express').Router();
const { default: mongoose } = require('mongoose');
const User = require('./users.model');
const userService = require('./users.service');
const passport = require('passport');
require('../strategies/local.js');

const roleMiddleware = (allowedRoles) => (req, res, next) => allowedRoles.includes(req.user?.role) ? next() : res.status(403).send()

router.post('/users/register', async (req, res) => {
    try {
        const user = await userService.register(req.body);
        return res.status(200).send(user);
    } catch(e) {
        return res.status(400).send("Bad Request, Try again !")
    }
    
});

router.post('/users/login', passport.authenticate('local', {session : false, failureRedirect : '/'}), async (req, res) => {
    if (req.user == 404) return res.status(404).send('Incorrect username')
    if (req.user == 403) return res.status(403).send('Incorrect password')
    else return res.status(200).send(await User.findOne({username: req.body.username}))
});

router.get('/users', passport.authenticate('jwt', {session: false}), roleMiddleware(['admin']), async (req, res) => {
	try {
        const users = await userService.findAll()
        return res.status(200).send(users)
    } catch (e) {
        return res.status(400).send("Bad Request, Try again !")
    }
});

router.get('/users/me', passport.authenticate('jwt', {session: false}), async (req, res) => {
    return res.status(200).send(await User.findOne({username: req.user.username}))
});

router.patch('/users/me', passport.authenticate('jwt', {session: false}), async (req, res) => {
    return res.status(200).send(await userService.updateUser(req.user._id, req.body))
});

router.delete('/users/me', passport.authenticate('jwt', {session: false}), async (req, res) => {
    return res.status(200).send(await userService.deleteUser(req.user._id))
});

module.exports = router