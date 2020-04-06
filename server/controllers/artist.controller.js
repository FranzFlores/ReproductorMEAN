'use strict'

var Artist = require('../models/artist.model');
var Album = require('../models/album.model');
var Song = require('../models/song.model');
var ArtistController = {};
var path = require('path');
var fs = require('fs');

ArtistController.createArtist = (req, res) => {
    new Artist({
        name: req.body.name,
        description: req.body.description,
        image: 'artist.png'
    }).save((err, artist) => {
        if (err) {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al crear artista' });
        } else {
            if (!artist) {
                res.status(404).send({ msg: 'No se pudo crear el artista' });
            } else {
                res.status(200).send({ msg: 'Se agrego el artista con éxito' });
            }
        }
    });
};

ArtistController.getArtists = (req, res) => {
    Artist.find({ status: true }).populate({ path: 'albums', model: 'Album', select: 'title' }).exec((err, artists) => {
        if (err) {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al obtener artistas' });
        } else {
            res.status(200).send(artists);
        }
    });
};

ArtistController.updateArtist = (req, res) => {
    var artistUpdated = {
        name: req.body.name,
        description: req.body.description,
    }

    Artist.findByIdAndUpdate(req.params.id, artistUpdated, (err, artist) => {
        if (err) {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al actualizar artistas' });
        } else {
            console.log(artist);
            res.status(200).send({ msg: 'Se ha actualizado el artista con éxito' });
        }
    });
};

ArtistController.deleteArtist = (req, res) => {
    Artist.findByIdAndUpdate(req.params.id, { status: false }, (err, artist) => {
        if (err) {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al eliminar artistas' });
        } else {
            if (!artist) {
                res.status(404).send({ msg: "El artista no ha sido eliminado" });
            } else {

                Album.find({ artistId: artist._id }).update({ status: false }, (err, album) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send({ msg: 'Ocurrió un error al eliminar artistas' });
                    } else {
                        if (!album) {
                            res.status(404).send({ msg: "El artista no ha sido eliminado" });
                        } else {

                            Song.find({ albumId: album._id }).update({ status: false }, (err, song) => {
                                if (err) {
                                    console.log(err);
                                    res.status(500).send({ msg: 'Ocurrió un error al eliminar artistas' });
                                } else {
                                    if (!song) {
                                        res.status(404).send({ msg: "El artista no ha sido eliminado" });
                                    } else {
                                        res.status(200).send({ msg: 'Se ha eliminado el artista con éxito' });
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    });
};

ArtistController.uploadImage = (req, res) => {
    var file_name = "Imagen no encontrada";

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\/');

        var file_name = file_split[(file_split.length - 1)];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'jpeg') {
            Artist.findByIdAndUpdate(req.params.id, { image: file_name }, (err, artistUpdate) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error al subir la imagen del artista');
                } else {
                    if (!artistUpdate) {
                        res.status(404).send({ msg: "Ocurrió un error al actualizar la foto de artista" });
                    } else {
                        res.status(200).send({ msg: "Se ha actualizado la foto del artista con éxito" });
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

ArtistController.getImagenFile = (req, res) => {
    var imageFile = req.params.imageFile;
    var path_file = './server/uploads/artists/' + imageFile

    fs.exists(path_file, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: "No existe la imagen" });
        }
    });
};

module.exports = ArtistController;
