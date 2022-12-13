const { compareSync } = require('bcrypt');
const passport = require('passport')
const LocalStrategy = require("passport-local").Strategy;
const User = require("../users/users.model");
const userService = require("../users/users.service")
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, async function (err, user) {
      if (err) return done(err);
      if (!user) return done(null, 404, {message : 'Incorrect username'});
      if (!compareSync(password, user.password)) return done(null, 403, {message : 'Incorrect password'});
      return done(null, user);
    })
  }
));

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  User.findOne({_id: jwt_payload.sub}, function(err, user) {
    if (err) return done(err, false);
    if (user) return done(null, user);
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  })
})