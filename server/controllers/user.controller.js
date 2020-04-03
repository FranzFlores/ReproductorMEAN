'use strict'

var User = require('../models/user.model');
var helpers = require('../lib/helpers');
var jwt = require('../lib/jwt');
var UserController = {};
var path = require('path');
var fs = require('fs');

//Crear Usuario Normal
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
                    role: 'Usuario',
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


UserController.createAdministrador = (req, res) => {
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
                    res.status(200).send({ token: jwt.createToken(user),data:user  });
                } else {
                    res.status(401).send({ msg: 'Clave Incorrecta' });
                }
            }
        }
    });
};


UserController.getUsers = (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            console.log(err);
            res.status(500).send({ msg: 'Error al obtener usuarios' });
        } else {
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

UserController.updatePassword = (req, res) => {    
    User.findById(req.params.id, (err, account) => {
        if (err) res.status(500).send('Error en la peticion');
        if (account) {
            if (helpers.matchPassword(req.body.oldPassword, account.password)) {
                var hash = helpers.generateHash(req.body.newPassword);
                var update = {};
                update.password = hash;
                User.findByIdAndUpdate(req.params.id, update, (err, account) => {
                    if (err) res.status(500).send({ message: "Error en la peticion" });
                    else {
                        if (!account) res.status(404).send({ message: "No se actualizo la cuenta" });
                        else res.status(200).send({ msg: 'Se ha actulizado la contraseña con éxito' });
                    }
                });
            }
        }
    });
};

UserController.deleteUser = (req, res) => {    
    User.findByIdAndUpdate(req.params.id, { status: false }, (err, user) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error en la peticion');
        } else {
            if (!user) {
                res.status(404).send({ msg: "Ocurrió un error al eliminar la cuenta" });
            } else {
                res.status(200).send({ msg: 'Se elimino el usuario con éxito' });
            }
        }
    });
};

UserController.restoreUser = (req, res) => {    
    User.findByIdAndUpdate(req.params.id, { status: true }, (err, user) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error en la peticion');
        } else {
            if (!user) {
                res.status(404).send({ msg: "Ocurrió un error al restaurar la cuenta" });
            } else {
                res.status(200).send({ msg: 'Se restauro el usuario con éxito' });
            }
        }
    });
};

UserController.uploadImage = (req, res) => {
    var file_name = "Imagen no encontrada";
    
    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\/');
        
        var file_name = file_split[(file_split.length-1)];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'jpeg') {
            User.findByIdAndUpdate(req.params.id, { image: file_name }, (err, userUpdate) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error al subir la imagen del usuario');
                } else {
                    if (!userUpdate) {
                        res.status(404).send({ msg: "Ocurrió un error al actualizar la foto de perfil de usuario" });
                    } else {
                        res.status(200).send({ msg: "Se ha actualizado la foto de perfil con éxito" });
                    }
                }
            });
        } else {
            res.status(200).send({ msg: "La extension del archivo no es correcta" });
        }
    } else {
        res.status(200).send({ message: "No se ha podido subir ninguna imagen" });
    }
};

UserController.getImageFile = (req,res) =>{
    var imageFile = req.params.imageFile;
    var path_file = './server/uploads/users/'+imageFile

    fs.exists(path_file,function(exists) {
      if (exists) {
        res.sendFile(path.resolve(path_file));
      }else {
        res.status(200).send({message:"No existe la imagen"});
      }
    });
};



module.exports = UserController;