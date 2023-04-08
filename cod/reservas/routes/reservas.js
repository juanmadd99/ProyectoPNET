'use strict';

const express = require('express');
const router = express.Router();
const reservasService = require('./reservas-service');
const { ObjectId } = require('mongodb');

router.get('/', function (req, res) {
    reservasService.getAll((err, reservas) => {
            if (err) {
                res.status(500).send({
                    msg: err
                });
            } else if (reservas.length == 0){
            	res.status(200).send({
                    msg: "No se ha realizado ninguna reserva a su nombre"
                });
            } else {
                res.status(200).send(reservas);
            }
        }
    );
});


//Consultar aforo///////////////////////////////////////////

/*router.get('/', function (req, res) {

    let sala = ObjectId(req.query._IDSala);
    let fecha =  new Date(req.query.FechaReserva);
    let hora = req.query.HoraReserva;
    
    reservasService.getAll(sala, fecha, hora, (err, reservas) => {
            if (err) {
                res.status(500).send({
                    msg: err
                });
            } 
            else {
                res.status(200).send(reservas);
            }
        });
});*/


///////////////////////////////////////////////////
router.post('/', function (req, res) {
    let reserv = req.body;
    reservasService.add(reserv, (err, reserv) => {
            if (err) {
                res.status(500).send({
                    msg: err
                });
            } else if (reserv.length != 0){
                res.status(201).send({
                    msg: 'Reserva Insertada!'
                });
            }
        }
    );
});


router.delete('/', function (req, res) {
    reservasService.removeAll((err) => {
        if (err) {
            res.status(500).send({
                msg: err
            });
        } else {
            res.status(200).send({
                msg: 'Se han eliminado todas sus reservas!'
            });
        }
    });
});




router.put('/:_id', function (req, res) {
    const _id = req.params._id;
    const updatedReserv = req.body;
    reservasService.update(_id, updatedReserv, (err, numUpdates) => {
        if (err) {
            res.status(500).send({
                msg: err
            });
	    } else if(numUpdates.modifiedCount === 0) {
            res.status(500).send({
                msg: "No se ha podido modificar la reserva"
            });
        } else {
            res.status(200).send({
                msg: 'Reserva actualizada!'
            });
        }
    });
});

router.delete('/:_id', function (req, res) {
    let _id = req.params._id;
    reservasService.remove(_id, (err) => {
        if (err) {
            res.status(500).send({
                msg: err
            });
        } 
        else {
            res.status(200).send({
                msg: 'Reserva eliminada!'
            });
        }
    });
});


//Cambios Jonás
//Detalles de una reserva por el cliente
router.get('/:nombreTitular', function (req, res) {
    let nt = req.params.nombreTitular;
    reservasService.get(nt, (err, res) => {
            if (err) {
                res.status(500).send({
                	msg: err
            	});
            } else if (res.length == 0){
            	res.status(500).send({
                    msg: "No se ha encontrado ninguna reserva"
                });
            } else {
                res.status(200).send(db.Reservas.find({ nombreTitular : nt }, { HoraReserva:1, FechaReserva:1, NumPersonas:1}));
            }
        }
    );
});

//Detalles de una reserva

router.get('/:_id', function (req, res) {
    let id = req.params._id;
    reservasService.get(id, (err, reserv) => {
            if (err) {
                res.status(500).send({
                	msg: err
            	});
            } else if (reserv.length == 0){
            	res.status(500).send({
                    msg: "No se ha encontrado ninguna reserva"
                });
            } else {
                res.status(200).send(db.Reservas.find({ _id : id }, { HoraReserva:1, FechaReserva:1, NumPersonas:1}));
            }
        }
    );
});


module.exports = router;
