'use strict'

var User = require('../models/user.model');
var helpers = require('../lib/helpers');
var jwt = require('../lib/jwt');
var UserController = {};

UserController.createUser = (req,res)=>{
    
    //Busca por email para comprobar si el usuario ya existe
    User.findOne({ email: req.body.email }, (err, personResult) => {
        if (err) {
            console.log(err);
            res.status(500).send({ msg: 'Error al guardar el usuario' });
        } else {
            
        }
    });

    new User({
        name: req.body.name,
        userName: req.body.userName,
        email: req.body.email,
        password: helpers.generateHash(req.body.password),
        role: 'Administrador',
        image: "null"
    }).save((err, newUser) => {
        if (err) {
            console.log(err);
            res.status(500).send({ msg: 'Error al guardar el usuario' });
        } else {
            if (!newUser) {
                res.status(404).send({ msg: 'No se ha registrado el usuario' });
            } else {
                res.status(200).send({ user: newUser });
            }
        }
    })

}
