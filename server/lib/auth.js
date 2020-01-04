//Protege la ruta mediante jwt token
'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');

const secret = 'reproductor';

exports.ensureAuth = function (req,res,next) {
    //Verifica si la ruta tiene una cabecera de autenticación
    if (!req.headers.authorization) {
        return res.status(403).send('La petición no tiene cabecera de autenticación');
    }

    //Variable que almacena todo el token sin espacios o caracteres raros
    var token = req.headers.authorization.replace(/['"]+/g, '');
    
    
    //Decodifica el token y usa una palabra secreta
    try {
        var payload = jwt.decode(token, secret);
        
        if (payload.exp <= moment().unix()) {
            return res.status(401).send("Token Expirado");
        }

    } catch (error) {
        console.log(error);
        return res.status(404).send("Token no válido");
    }

    req.user = payload;
    next();

}

