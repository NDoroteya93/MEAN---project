/* global process */
/* eslint-disable no-process-env */
const { Router } = require('express');
const _ = require('lodash');
const encrypt = require('../utils/encryption.js');
const { createToken } = require('../config/token.config');
const jwt = require('express-jwt');

const apiRouter = (data) => {
    const router = new Router();

    const jwtCheck = jwt({
            secret: process.env.JWT_SECRET,
            // audience: 'https://nikolova.auth0.com/api/v2/',
        })
        .unless({ path: '/api/authenticate' });
    router.use(jwtCheck);

    router.use((err, req, res, next) => {
        if (err.name === 'UnauthorizedError') {
            return res.status(401)
                .send({ 'message': err.name + ': ' + err.message });
        }
    });

    router.get('/users', (req, res) => {
        return data.auth.getAll()
            .then((users) => {
                return res.json(users);
            });
    });
    router.post('/users', (req, res) => {
        const user = req.body;
        // !TODO: Validation
        if (!req.body.username || !req.body.password) {
            return res.status(400)
                .send('You must send the username and the password');
        }

        return encrypt.generateHashedPassword(user.password)
            .then((hashPass) => {
                const profile = {
                    username: user.username,
                    password: hashPass,
                    firstname: user.firstname,
                    lastname: user.lastname,
                };

                return profile;
            })
            .then((profile) => {
                return data.auth.register(profile)
                    .then((result) => {
                        return res.status(201).send({
                            id_token: createToken(result),
                        });
                    });
            });
    });

    router.post('/sessions/create', (req, res) => {
        const user = req.body;
        return data.auth.findBy({ username: user.username })
            .then((result) => {
                if (!user.username || !user.password) {
                    return res.status(400)
                        .send('You must send the username and the password');
                }
                if (!result) {
                    return res.status(401)
                        .send('The username or password don\'t match');
                }

                if (!encrypt.comparePassword(user.password, result.password)) {
                    return res.status(401)
                        .send('The username or password don\'t match');
                }
                return res.status(201).send({
                    message: 'succesfully authenticated',
                    id_token: createToken(user),
                });
            });
    });

    // check 
    router.post('/authenticate', (req, res) => {
        const user = req.body;
        return data.auth.findBy({ username: user.username })
            .then((result) => {
                if (!result) {
                    return res.status(404).json({ error: 'user not found' });
                }
                if (!encrypt.comparePassword(user.password, result.password)) {
                    return res.status(401)
                        .json({ error: 'Incorrect password' });
                }

                return res.json({
                    message: 'succesfully authenticated',
                    id_token: createToken(result),
                });
            });
    });


    return router;
};


module.exports = { apiRouter };
