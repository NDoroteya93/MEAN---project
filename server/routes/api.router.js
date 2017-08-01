const { Router } = require('express');
const passport = require('passport');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const encrypt = require('../utils/encryption.js');
const createToken = require('../config');;

const apiRouter = (data) => {
    const router = new Router();
    router.get('/', (req, res) => {
        res.send('api works');
    });

    // router.route('/login')
    //     .get((req, res) => {
    //         return res.json(req.user);
    //     })
    //     .post(passport.authenticate('local', {
    //         successRedirect: '/',
    //         failureRedirect: '/login',
    //         failureFlash: true,
    //     }));

    router.post('/users', (req, res) => {
        const user = req.body;
        const salt = encrypt.generateSalt();
        if (!req.body.username || !req.body.password) {
            return res.status(400)
                .send('You must send the username and the password');
        }

        if (data.findBy({ username: user.username })) {
            return res.status(400)
                .send('A user with that username already exist');
        }
        const profile = {
            username: user.username,
            password: encrypt
                .generateHashedPassword(salt, user.password),
            firstname: user.firstname,
            lastname: user.lastname,
        };

        data.register(profile);

        return res.status(201).send({
            id_token: createToken.authConfig(profile),
        });
    });

    router.post('/sessions/create', (req, res) => {
        const body = req.body;
        if (!req.body.username || !req.body.password) {
            return res.status(400)
                .send('You must send the username and the password');
        }

        const user = data.findB({ username: body.username });
        if (!user) {
            return res.status(401)
                .send('The username or password don\'t match');
        }

        if (!(user.password === req.body.password)) {
            return res.status(401)
                .send('The username or password don\'t match');
        }

        res.status(201).send({
            id_token: createToken(user),
        });
    });

    return router;
};


module.exports = { apiRouter };
