'use strict'

var Album = require('../models/album.model');
var AlbumController = {};

AlbumController.createAlbum = (req, res) => {
    //Revisar si el album ya ha sido agregado 
    Album.find({ title: req.body.title, artistId: req.body.artist }, (err, artist) => {
        if (err) res.status(500).send({ msg: 'Ocurrió un error al crear el álbum' });
        else {
            if (artist) res.status(200).send({ msg: 'El álbum ya está registrado' });
            else {
                new Album({
                    title: req.body.title,
                    year: req.body.year,
                    image: 'null',
                    gender: req.body.gender,
                    artistId: req.body.artist
                }).save((err, album) => {
                    if (err) res.status(500).send({ msg: 'Ocurrió un error al crear el álbum' });
                    else {
                        if (!album) res.status(404).send({ msg: 'No se pudo crear el álbum' });
                        else res.status(200).send({ msg: 'Se agrego el álbum con éxito' });
                    }
                });
            }
        }
    });
};

AlbumController.getAlbums = (req, res) => {
    Album.find({ status: true }).populate({ path: 'artistId', model: 'Artist' }).exec((err, albums) => {
        if (err) res.status(500).send("Error");
        else res.status(200).send(albums);
    });
};

AlbumController.updateAlbum = (req, res) => {
    var albumUpdated = {
        title: req.body.title,
        year: req.body.year,
        gender: req.body.gender,
        artistId: req.body.artist
    }

    Album.findByIdAndUpdate(req.params.id, albumUpdated, (err, album) => {
        if (err) res.status(500).send({ msg: 'Ocurrió un error al actualizar album' });
        else {
            console.log(album);
            res.status(200).send({ msg: 'Se ha actualizado el album con éxito' });
        }
    });
};

AlbumController.deleteAlbum = (req, res) => {
    Album.findByIdAndUpdate(req.params.id, { status: false }, (err, album) => {
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
