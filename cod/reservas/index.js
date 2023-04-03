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

app.get('/', function (req, res) {
    res.status(200).send('hello world');
    //res.status(200).sendFile('../html/reserva.html', { root: __dirname });
});
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);
server.listen(PORT, function () {
console.log('Server up and running on localhost:' + PORT);
});
