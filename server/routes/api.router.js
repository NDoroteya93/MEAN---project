const { Router } = require('express');
const _ = require('lodash');
const encrypt = require('../utils/encryption.js');
const { createToken } = require('../config/token.config');

const apiRouter = (data) => {
    const router = new Router();
    router.get('/', (req, res) => {
        res.send('api works');
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

        const profile = {
            username: user.username,
            password: encrypt
                .generateHashedPassword(user.password),
            firstname: user.firstname,
            lastname: user.lastname,
        };
        return data.auth.register(profile)
            .then((result) => {
                return res.status(201).send({
                    id_token: createToken(result),
                });
            });
    });

    router.post('/sessions/create', (req, res) => {
        const body = req.body;
        if (!req.body.username || !req.body.password) {
            return res.status(400)
                .send('You must send the username and the password');
        }

        const user = data.auth.findBy({ username: body.username });
        if (!user) {
            return res.status(401)
                .send('The username or password don\'t match');
        }

        if (!(user.password === req.body.password)) {
            return res.status(401)
                .send('The username or password don\'t match');
        }

        return res.status(201).send({
            id_token: createToken(user),
        });
    });

    router.post('/authenticate', (req, res) => {
        const user = req.body;
        data.auth.findBy({ username: user.username })
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
