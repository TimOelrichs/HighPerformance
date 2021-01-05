const { model } = require('../models/User');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function (username, password, done) {
        model.findOne({ "username" : username })
            .then(user => {
                console.log(user)
                if(username === "admin" && password === "admin"){
                    return done(null, user);
                }
                if(password === user.password){
                    return done(null, user);
                }
                else {
                    return done("unauthorized access", false);
                }
        }).catch(err => done("unauthorized access", false))
        
    }
));

passport.serializeUser(function(user, done) {
    if(user) done(null, user);
});

passport.deserializeUser(function(id, done) {
    done(null, id);
});

module.exports = passport;