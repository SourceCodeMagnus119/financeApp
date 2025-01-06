const passport = require("passport");
const User = require("../models/user");
const LocalStrategy = passport.Strategy();

/**
 * @param Authenticate Requests.
 */
passport.use(new LocalStrategy(
    function( username, password, done ) {
        User.findOne({ username: username }, (err, user) => {
            if(err) { return done(err)};
            if(!user) { return done(null, false) };
            if(!user.verifyPassword(password)) { return done(null, false)};
            return done(null, user);
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(null, user)
    });
});

module.exports = passport;