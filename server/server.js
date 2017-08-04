/* global process */
/* eslint-disable no-process-env */
require('dotenv').config();
const port = process.env.PORT || 3000;
const mongoConnect = process.env.DB_CONN || 'mongodb://localhost/MedDb';

const db = require('./db');

Promise.resolve()
    .then(() => db.connect(mongoConnect))
    .then((database) => {
        const data = require('./data').initData(database);
        return require('./app').initApp(data, database);
    })
    .then((app) => {
        return app.listen(port, () => {
            console.log(`API running on localhost:${port}`);
        });
    });
