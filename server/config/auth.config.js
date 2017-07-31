const session = require('express-session');
const passport = require('passport');
const { Strategy } = require('passport-local');
const MongoStore = require('connect-mongo')(session);
const encryption = require('../../utils/encryption');

const configAuth = (app, { auth }, db, secret) => {
    passport.use(new Strategy((username, password, done) => {
        auth.findBy({ username: username })
            .then((user) => {
                if (!user) {
                    return done(null,
                        false, { message: 'Incorrect username.' });
                }
                const hashPass = encryption
                    .generateHashedPassword(user.salt, password);

                if (user.hashedPass !== hashPass) {
                    return done(null,
                        false, { message: 'Incorrect password.' });
                }

                return done(null, user);
            });
    }));

    app.use(session({
        store: new MongoStore({ db }),
        secret,
        resave: true,
        saveUninitialized: true,
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        auth.getById(id)
            .then((user) => {
                done(null, user);
            }).catch(done);
    });
    app.use((req, res, next) => {
        res.locals = {
            user: req.user,
        };
        next();
    });
};

module.exports = configAuth;
