    const { Router } = require('express');
    const jwt = require('express-jwt');
    const config = require('../config/config.json');
    const quoter = require('../utils/quotes');

    const protectedRouter = () => {
        const router = new Router();

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
