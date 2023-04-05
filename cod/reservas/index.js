const express = require('express');
const app = express();
const logger = require('morgan');
const http = require('http');
const path = require('path');
const PORT = process.env.PORT || 8080;
const baseAPI = '/api/v1';
app.use(express.json());
app.use(express.urlencoded({
extended: true
}));
app.use(logger('dev'));

/*app.get('/', function (req, res) {
    res.status(200).send('hello world');
    //res.status(200).sendFile('../html/reserva.html', { root: __dirname });
});*/
app.use(express.static(path.join(__dirname, '/public/html')));

const CSS_DIR = path.join(__dirname, '/public/css');
const IMG_DIR = path.join(__dirname, '/public/img');
const JS_DIR = path.join(__dirname, '/public/js');

app.use('/img', express.static(IMG_DIR));
app.use('/css', express.static(CSS_DIR));
app.use('/js', express.static(JS_DIR));

const server = http.createServer(app);
server.listen(PORT, function () {
console.log('Server up and running on localhost:' + PORT);
});
