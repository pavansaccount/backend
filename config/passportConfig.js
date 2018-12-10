const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(
    new localStrategy({ usernameField: 'email' },
        (username, password, done) => {
            User.findOne({ email: username },
                (err, User) => {
                    if (err)
                        return done(err);
                    else if (!User)
                        return done(null, false, { message: 'Email is not registered' });
                    else if (!User.verifyPassword(password))
                        return done(null, false, { message: 'wrong password' });
                    else
                        return done(null, User);
                });
        })
);
