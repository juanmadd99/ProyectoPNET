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


//Definimos la carpeta del cliente (código para parte visible)
app.use(express.static(path.join(__dirname, '/public/html')));

//Carga los datos que se encuentran en el directorio css, img y js
const CSS_DIR = path.join(__dirname, '/public/css');
const IMG_DIR = path.join(__dirname, '/public/img');
const JS_DIR = path.join(__dirname, '/public/js');

app.use('/img', express.static(IMG_DIR));
app.use('/css', express.static(CSS_DIR));
app.use('/js', express.static(JS_DIR));

//Definir la conexión a la BD, las operaciones
const reservasService = require('./routes/reservas-service');
const reservas = require('./routes/reservas');

//Definir ruta de la API
app.use('/reservas', reservas);

//Iniciar servidor
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
    