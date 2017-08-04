/* global process */
/* eslint-disable no-process-env */

const config = require('./config.json');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const createToken = (user) => {
    const payload = {
        username: user.username,
        admin: user.admin,
    };
    const secret = process.env.JWT_SECRET || config.secret;

    return jwt.sign(payload, secret, { expiresIn: 60 * 60 * 24 });
};

module.exports = { createToken };
