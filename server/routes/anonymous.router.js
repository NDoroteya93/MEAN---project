const anonymousRouter = () => {
    const express = require('express');
    const quoter = require('../utils/quotes');
    const router = new express.Router();

    router.get('/api/random-quote', function(req, res) {
        return res.status(200).send(quoter.getRandomOne());
    });

    return router;
};

module.exports = { anonymousRouter };
