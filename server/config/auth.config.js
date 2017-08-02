// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);

const config = require('./config.json');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const createToken = (user) => {
    return jwt.sign(_.omit(user, 'password'),
        config.secret, { expiresInMinutes: 60 * 5 });
};

module.exports = createToken;
