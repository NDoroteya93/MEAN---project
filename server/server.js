/* global process */
/* eslint-disable no-process-env */

const port = process.env.PORT || 3000;

const db = require('./db');

Promise.resolve()
    .then(() => db.connect('mongodb://localhost/MedDb'))
    .then((database) => {
        const data = require('./data').initData(database);
        return require('./app').initApp(data, database);
    })
    .then((app) => {
        return app.listen(port, () => {
            console.log(`API running on localhost:${port}`);
        });
    });
