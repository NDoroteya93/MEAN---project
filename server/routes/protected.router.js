const protectedRouter = () => {
    const express = require('express');
    const jwt = require('express-jwt');
    const config = require('../config/config.json');
    const quoter = require('../utils/quotes.json');

    const router = new express.Router();

    const jwtCheck = jwt({
        secret: config.secret,
    });

    router.use('/api/protected', jwtCheck);

    router.get('/api/protected/random-quote', (req, res) => {
        res.status(200).send(quoter.getRandomOne());
    });

    return router;
};

module.exports = { protectedRouter };
