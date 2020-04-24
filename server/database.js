'use strict'

const mongoose = require('mongoose');
const URI = 'mongodb://localhost/reproductorMEAN';

mongoose.connect(URI,{ useNewUrlParser: true,useUnifiedTopology: true })
    .then(db => console.log('Data Base Connect!'))
    .catch(err => console.error(err));

module.exports = mongoose;