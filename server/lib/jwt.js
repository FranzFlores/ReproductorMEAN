'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');

const secret = 'reproductor';

//Crea el token con un duracion de 30 dias 
exports.createToken = function (user) {
    console.log(user);
    
    var payload = {
        id: user._id,
        name: user.name,
        userName: user.userName,
        email: user.email,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    }

    return jwt.encode(payload,secret);
}