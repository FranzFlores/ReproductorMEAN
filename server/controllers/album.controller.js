'use strict'

var Album = require('../models/album.model');
var AlbumController = {};

AlbumController.createAlbum = (req, res) => {
    new Album({
        title: req.body.title,
        year: req.body.year,
        image: 'null',
        gender: req.body.gender,
        artistId: req.params.id
    }).save((err, album) => {
        if (err) {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al crear albuma' });
        } else {
            if (!album) {
                res.status(404).send({ msg: 'No se pudo crear el albuma' });
            } else {
                res.status(200).send({ msg: 'Se agrego el album con éxito' });
            }
        }
    });
};

AlbumController.getAlbums = (req, res) => {
    Album.find({}, (err, albums) => {
        if (err) {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al obtener albumas' });
        } else {
            res.status(200).send(albums);
        }
    });
};

AlbumController.updateAlbum = (req, res) => {
    var albumUpdated = {
        title: req.body.title,
        year: req.body.year,
        gender: req.body.gender,
        artistId: req.aritst.id
    }

    Album.findByIdAndUpdate(req.params.id, albumUpdated, (err, album) => {
        if (err) {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al actualizar albumas' });
        } else {
            console.log(album);
            res.status(200).send({ msg: 'Se ha actualizado el albuma con éxito' });
        }
    });
};

AlbumController.deleteAlbum = (req, res) => {
    Album.findByIdAndUpdate(req.params.id, {status:false}, (err, album) => {
        if (err) {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al eliminar albumas' });
        } else {
            console.log(album);
            res.status(200).send({ msg: 'Se ha eliminado el albuma con éxito' });
        }
    });
};


module.exports = AlbumController;
