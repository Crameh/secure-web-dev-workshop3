const { compareSync } = require('bcrypt');
const passport = require('passport')
const LocalStrategy = require("passport-local").Strategy;
const User = require("../users/users.model");
const userService = require("../users/users.service")


passport.use(new LocalStrategy(
  async function (username, password, done) {
    try {
      const user = await userService.checkPassword(username, password)
      if (!user) return done(null, false, {message : 'Incorrect username'});
    } catch(err) {
      if (err) {return done(err)}
    }
  }
))

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) return done(err);
      if (!user) return done(null, false, {message : 'Incorrect username'});
      if (!compareSync(password, user.password)) return done(null, false, {message : 'Incorrect password'});
      return done(null, user);
    })
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  })
})