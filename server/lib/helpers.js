const bcrypt = require('bcrypt-nodejs');
const helpers = {};

//Codifica la contraseña
helpers.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

//Decodifica la contraseña
helpers.matchPassword = function(userPassword,password){
    return bcrypt.compareSync(userPassword,password);
};

module.exports = helpers;