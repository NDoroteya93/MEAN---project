/* global process */
/* eslint-disable no-process-env */
const { Router } = require('express');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const config = require('../config/config.json');
const quoter = require('../utils/quotes');
const jwtAuthz = require('express-jwt-authz');


const protectedRouter = () => {
    const router = new Router();

    // const jwtCheck = jwt({
    //     // Dynamically provide a signing key
    //     // based on the kid in the header and 
    //     // the singing keys provided by the JWKS endpoint.
    //     secret: jwksRsa.expressJwtSecret({
    //         cache: true,
    //         rateLimit: true,
    //         jwksRequestsPerMinute: 5,
    //         jwksUri: `https://nikolova.auth0.com/.well-known/jwks.json`,
    //     }),

    //     // Validate the audience and the issuer.
    //     audience: 'https://nikolova.auth0.com/api/v2/',
    //     issuer: `https://nikolova.auth0.com/`,
    //     algorithms: ['RS256'],
    // });

    const checkScopes = jwtAuthz(['read:messages']);

    const jwtCheck = jwt({
            secret: process.env.JWT_SECRET,
            // audience: 'https://nikolova.auth0.com/api/v2/',
        })
        .unless({ path: '/api/authenticate' });

    router.use('/api/protected', jwtCheck);

    router.get('/api/protected/random-quote', (req, res) => {
        res.status(200).send(quoter.getRandomOne());
    });

    return router;
};

module.exports = { protectedRouter };
