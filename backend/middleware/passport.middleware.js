const { model } = require('../models/User');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function (username, password, done) {
        model.findOne({ "userId" : username })
            .then(user => {
           
                if (password === user.password) {
                    console.log("LOGIN] ", user);
                    delete user.password;
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