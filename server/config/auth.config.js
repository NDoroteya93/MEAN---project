const session = require('express-session');
const passport = require('passport');
const { Strategy } = require('passport-local');
const MongoStore = require('connect-mongo')(session);
const encryption = require('../../utils/encryption');


const createToken = (user) => {
    const config = require('./config.json');
    const jwt = require('jsonwebtoken');
    const _ = require('lodash');

    return jwt.sign(_.omit(user, 'password'),
        config.secret, { expiresInMinutes: 60 * 5 });
};

module.exports = createToken;
