// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const db = require('./db')
const api = require('./routes/api')();

const app = express();

const cookieParser = require('cookie-parser');
const logger = require('./logger');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../dist')));
app.use('/api', api);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

logger.attachTo(app);

app.use(cookieParser());

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

Promise.resolve()
    .then(() => db.connect('mongodb://localhost/MedDb'))
    .then((database) => {
        const data = require('./data').initData(database);

        return { data: data, db: database }
        // require('./config').authConfig(app, data, database, 'Res Med');
    })
    .then((settings) => {
        // require('./config').authConfig(app, settings.data, settings.db, 'Res Med');
    })
    .then(() => {

        server.listen(port, () => console.log(`API running on localhost:${port}`));
    })
