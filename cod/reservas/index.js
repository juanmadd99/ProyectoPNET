const express = require('express');
const app = express();
const logger = require('morgan');
const http = require('http');
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 8080;
const baseAPI = '/api/v1';
app.use(express.json());
app.use(express.urlencoded({
extended: true
}));
app.use(logger('dev'));
app.use(cors());

app.use(express.static(path.join(__dirname, '/public/html')));

const CSS_DIR = path.join(__dirname, '/public/css');
const IMG_DIR = path.join(__dirname, '/public/img');
const JS_DIR = path.join(__dirname, '/public/js');

app.use('/img', express.static(IMG_DIR));
app.use('/css', express.static(CSS_DIR));
app.use('/js', express.static(JS_DIR));

const reservasService = require('./routes/reservas-service');
const reservas = require('./routes/reservas');
app.use('/reservas', reservas);

const server = http.createServer(app);

reservasService.connectDb(function (err) {
    if (err) {
        console.log('Could not connect with MongoDB – reservasService');
        process.exit(1);
    }
    server.listen(PORT, function () {
        console.log('Server up and running on localhost:' + PORT);
    });
});
    