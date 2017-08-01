/* global process */
/* globals __dirname */
/* eslint-disable no-process-env */
const initApp = (data, db) => {
    const express = require('express');
    const path = require('path');
    const http = require('http');
    const bodyParser = require('body-parser');
    const api = require('./routes/api.router')();
    const dotenv = require('dotenv');
    const cors = require('cors');
    const errorhandler = require('errorhandler');
    const cookieParser = require('cookie-parser');
    const logger = require('./logger');
    const { anonymousRouter } = require('./routes').anonymousRouter;
    const { protectedRouter } = require('./routes').protectedRouter;
    const { apiRouter } = require('./routes').apiRouter;

    const app = express();
    const server = http.createServer(app);

    dotenv.load();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors());

    app.use((err, req, res, next) => {
        if (err.name === 'StatusError') {
            res.send(err.status, err.message);
        } else {
            next(err);
        }
    });

    if (process.env.NODE_ENV === 'development') {
        app.use(express.logger('dev'));
        app.use(errorhandler());
    }

    app.use(express.static(path.join(__dirname, '../dist')));

    app.use(anonymousRouter());
    app.use(protectedRouter());
    app.use(apiRouter(data));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../dist/index.html'));
    });


    logger.attachTo(app);

    app.use(cookieParser());

    return Promise.resolve(server);
};

module.exports = { initApp };
