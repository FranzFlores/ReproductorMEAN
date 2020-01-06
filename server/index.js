'use strict'
const express = require('express');
var morgan = require('morgan');
const errors = require('http-errors');
const cors = require('cors');
const path = require('path');
const cookie = require('cookie-parser');
const app = express();

const { mongoose } = require('./database');

// Configuraciones
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(cors({
    credentials: true, 
    origin: 'http://localhost:4200'
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/user', require('./routes/user.route'));
app.use('/api/artist',require('./routes/artist.route'));

// starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on Port ${app.get('port')}`);
});

app.use(function(req, res, next) {
    next(errors(404));
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500).send(err.message);
});


module.exports = app; 
