'use strict'

var Song = require('../models/song.model');
var SongController = {};

SongController.createSong = (req, res) => {
    new Song({
        title: req.body.title,
        number: req.body.number,
        albumId: req.body.album
    }).save((err, song) => {
        if (err) {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al crear songa' });
        } else {
            if (!song) {
                res.status(404).send({ msg: 'No se pudo crear el songa' });
            } else {
                res.status(200).send({ msg: 'Se agrego el song con éxito' });
            }
        }
    });
};

SongController.getSongs = (req, res) => {
    Song.find({}, (err, songs) => {
        if (err) {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al obtener songas' });
        } else {
            res.status(200).send(songs);
        }
    });
};

SongController.updateSong = (req, res) => {
    var songUpdated = {
        title: req.body.title,
        year: req.body.year,
        gender: req.body.gender,
        artistId: req.aritst.id
    }

    Song.findByIdAndUpdate(req.params.id, songUpdated, (err, song) => {
        if (err) {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al actualizar song' });
        } else {
            console.log(song);
            res.status(200).send({ msg: 'Se ha actualizado el song con éxito' });
        }
    });
};

SongController.deleteSong = (req, res) => {
    Song.findByIdAndUpdate(req.params.id, {status:false}, (err, song) => {
        if (err) {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al eliminar songas' });
        } else {
            console.log(song);
            res.status(200).send({ msg: 'Se ha eliminado el songa con éxito' });
        }
    });
};


module.exports = SongController;
