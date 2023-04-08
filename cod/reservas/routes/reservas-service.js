'use strict';

const MongoClient = require('mongodb').MongoClient;
let db;
let ObjectId = require('mongodb').ObjectId;
const Reservas = function () {
};

Reservas.prototype.connectDb = function (callback) {
    MongoClient.connect("mongodb+srv://jonasND:passWORD22@jnd-pnet-2022-2023.iv7xdbr.mongodb.net/?retryWrites=true&w=majority",
        {useNewUrlParser: true, useUnifiedTopology: true},
        function (err, database) {
            if (err) {
		console.log(err);
                callback(err);
            }

   	    db = database.db('jnd-pnet-2022-2023').collection('Reservas');
	    console.log("Conexión correcta");

            callback(err, database);
        });
};

Reservas.prototype.add = function (reservas, callback) {
    return db.insertOne(reservas, callback);
};

Reservas.prototype.get = function (_id, callback) {
    return db.find({_id: ObjectId(_id)}).toArray(callback);
};

//Consultar aforo////////////////////
/*Reservas.prototype.getAll = function (_IDSala, FechaReserva, HoraReserva, callback) {
    return db.find({
      _IDSala: ObjectId(_IDSala),
      FechaReserva: new Date(FechaReserva),
      HoraReserva: HoraReserva
    }).toArray(callback);
};*/

Reservas.prototype.getAll = function (callback) {
    return db.find({}).toArray(callback);
};

Reservas.prototype.update = function (_id, updatedreservas, callback) {
    delete updatedreservas._id;
    return db.updateOne({_id: ObjectId(_id)}, {$set: updatedreservas}, callback);
};

Reservas.prototype.remove = function (_id, callback) {
    return db.deleteOne({_id: ObjectId(_id)}, callback);
};

Reservas.prototype.removeAll = function (callback) {
    return db.deleteMany({}, callback);
};

module.exports = new Reservas();


