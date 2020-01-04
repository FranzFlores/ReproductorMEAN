'use strict'

var User = require('../models/user.model');
var helpers = require('../lib/helpers');
var jwt = require('../lib/jwt');
var UserController = {};

UserController.createUser = (req, res) => {
    //Busca por email para comprobar si el usuario ya existe
    User.findOne({ email: req.body.email }, (err, personResult) => {
        if (err) {
            console.log(err);
            res.status(500).send({ msg: 'Error al guardar el usuario' });
        } else {
            if (personResult) {
                res.status(200).send({ msg: 'El usuario ya esta registrado' });
            } else {
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
        }
    });
};

UserController.login = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            console.log(err);
            res.status(500).send({ msg: 'Error al iniciar sesión' });
        } else {
            if (!user) {
                res.status(404).send({ msg: 'El usuario no esta registrado' });
            } else {
                if (helpers.matchPassword(req.body.password, user.password)) {
                    res.status(200).send({ token: jwt.createToken(user) });
                } else {
                    res.status(401).send({ msg: 'Clave Incorrecta' });
                }
            }
        }
    });
};


UserController.getUsers = (req,res)=>{
    User.find({},(err,users)=>{
        if (err) {
            console.log(err);
            res.status(500).send({ msg: 'Error al obtener usuarios' });
        }else{
            res.status(200).send(users);
        }
    });
}

UserController.updateUser = (req, res) => {    
    var userUpdate = {
        name: req.body.name,
        userName: req.body.userName,
        role: req.body.role
    }

    User.findByIdAndUpdate(req.params.id, userUpdate, (err, user) => {
        if (err) {
            console.log(err);
            res.status(500).send({ msg: 'Error al actualizar el usuario' });
        } else {
            if (!user) {
                res.status(404).send({ msg: 'Ocurrio un error al actualizar la informacion del usuario' });
            } else {
                res.status(200).send({ msg: 'Se ha actualizado la información del usuario con éxito' })
            }
        }
    });
}

UserController.updatePassword = (req,res) =>{    
    User.findById(req.params.id, (err, account) => {
      if (err) res.status(500).send('Error en la peticion');
      if (account) {
        if (helpers.matchPassword(req.body.oldPassword,account.password)) {
          var hash = helpers.generateHash(req.body.newPassword);
          var update = {};
          update.password = hash;
          User.findByIdAndUpdate(req.params.id, update, (err, account) => {
            if (err) res.status(500).send({ message: "Error en la peticion" });
            else {
              if (!account) res.status(404).send({ message: "No se actualizo la cuenta" });
              else res.status(200).send({msg: 'Se ha actulizado la contraseña con éxito'});
            }
          });
        }
      }
    });
};

UserController.deleteUser = (req,res)=>{
    User.findByIdAndUpdate(req.params.id,{status:false},(err,user)=>{
        if (err) {
            console.log(err);
            res.status(500).send('Error en la peticion');
        }else{
            if (!user) {
                res.status(404).send({ msg: "Ocurrió un error al eliminar la cuenta" });
            }else{
                res.status(200).send({msg:'Se elimino el usuario con éxito'});
            }
        }
    });
};




module.exports = UserController;