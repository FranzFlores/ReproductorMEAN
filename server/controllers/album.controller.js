'use strict'

var Album = require('../models/album.model');
var Artist = require('../models/artist.model');
var Song = require('../models/song.model');
var path = require('path');
var fs = require('fs');
var AlbumController = {};

AlbumController.createAlbum = (req, res) => {     
    //Revisar si el album ya ha sido agregado 
    console.log(req.body);
    
    Album.find({ title: req.body.title, artistId: req.body.artist }, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al crear el álbum' });
        } else {
            if (results.length > 0) res.status(200).send({ msg: 'El álbum ya está registrado' });
            else {
                new Album({
                    title: req.body.title,
                    year: req.body.year,
                    image: 'album.jpg',
                    gender: req.body.gender,
                    artistId: req.body.artist
                }).save((err, albumCreate) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send({ msg: 'Ocurrió un error al crear el álbum' });
                    }
                    else {
                        if (!albumCreate) res.status(404).send({ msg: 'No se pudo crear el álbum' });
                        else {
                            //Buscar el album y agregar el album agregado 
                            Artist.findById(req.body.artist, (err, artist) => {
                                if (err) {
                                    console.log(err);
                                    res.status(500).send({ msg: 'Ocurrió un error al crear el álbum' });
                                } else {
                                    artist.albums.push(albumCreate._id);
                                    var albums = artist.albums;
                                    Artist.findByIdAndUpdate(req.body.artist, { albums: albums }, (err, artist) => {
                                        if (err) {
                                            console.log(err);
                                            res.status(500).send({ msg: 'Ocurrió un error al crear el álbum' });
                                        } else {
                                            res.status(200).send({ msg: 'Se agrego el álbum con éxito' });
                                        }
                                    });
                                }
                            });
                        }
                    }
                });
            }
        }
    });
};

AlbumController.getAlbums = (req, res) => {
    Album.find({ status: true }).populate({ path: 'artistId', model: 'Artist', select: 'name' }).exec((err, albums) => {
        if (err) res.status(500).send("Error");
        else res.status(200).send(albums);
    });
};

AlbumController.getAlbumsByStatus = (req, res) => {
    console.log(req.body);
    
    Album.find({ status: req.body.status }).populate({ path: 'artistId', model: 'Artist', select: 'name' }).exec((err, albums) => {
        if (err) res.status(500).send("Error");
        else res.status(200).send(albums);
    });
};

AlbumController.updateAlbum = (req, res) => {
    var albumUpdated = {
        title: req.body.title,
        year: req.body.year,
        gender: req.body.gender
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
            res.status(500).send({ msg: 'Ocurrió un error al eliminar album' });
        } else {
            Song.find({ albumId: album._id }).update({ status: false }, (err, song) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({ msg: 'Ocurrió un error al eliminar el album' });
                } else {
                    if (!song) {
                        res.status(404).send({ msg: "El album no ha sido eliminado" });
                    } else {
                        res.status(200).send({ msg: 'Se ha eliminado el album con éxito' });
                    }
                }
            });
        }
    });
};

AlbumController.restoreAlbum = (req, res) => {
    Album.findByIdAndUpdate(req.params.id, { status: true }, (err, album) => {
        if (err) {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al restaurar album' });
        } else {
            Song.find({ albumId: album._id }).update({ status: true }, (err, song) => {
                if (err) {
                    console.log(err);
                    res.status(500).send({ msg: 'Ocurrió un error al restaurar el album' });
                } else {
                    if (!song) {
                        res.status(404).send({ msg: "El album no ha sido restaurado" });
                    } else {
                        res.status(200).send({ msg: 'Se ha restaurado el album con éxito' });
                    }
                }
            });
        }
    });
};


AlbumController.uploadImage = (req, res) => {
    var file_name = "Imagen no encontrada";

    if (req.files) {
        var file_path = req.files.image.path;
        if (process.platform == 'darwin') {
            var file_split = file_path.split('\/');
        } else {
            var file_split = file_path.split('\\');
        }

        var file_name = file_split[(file_split.length - 1)];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'jpeg') {
            Album.findByIdAndUpdate(req.params.id, { image: file_name }, (err, albumUpdate) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error al subir la imagen del album');
                } else {
                    if (!albumUpdate) {
                        res.status(404).send({ msg: "Ocurrió un error al actualizar la foto de album" });
                    } else {
                        res.status(200).send({ msg: "Se ha actualizado la foto del album con éxito" });
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

AlbumController.getImagenFile = (req, res) => {
    var imageFile = req.params.imageFile;
    var path_file = './server/uploads/albums/' + imageFile

    fs.exists(path_file, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: "No existe la imagen" });
        }
    });
};


module.exports = AlbumController;
