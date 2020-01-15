'use strict'

var Song = require('../models/song.model');
var SongController = {};

SongController.createSong = (req, res) => {
    new Song({
        title: req.body.title,
        number: req.body.number,
        file:'null',
        albumId: req.body.album
    }).save((err, song) => {
        if (err) {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al crear la canción' });
        } else {
            if (!song) {
                res.status(404).send({ msg: 'No se pudo crear la canción' });
            } else {
                res.status(200).send({ msg: 'Se agrego la canción con éxito' });
            }
        }
    });
};

SongController.getSongs = (req, res) => {
    Song.find({ status: true }).populate({
        path: 'albumId', model: 'Album', select: 'title',
        populate: { path: 'artistId', model: 'Artist', select: 'name' }
    }).exec((err, songs) => {
        if (err) {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al obtener las canciones' });
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
    }

    Song.findByIdAndUpdate(req.params.id, songUpdated, (err, song) => {
        if (err) {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al actualizar la canción' });
        } else {
            console.log(song);
            res.status(200).send({ msg: 'Se ha actualizado la canción con éxito' });
        }
    });
};

SongController.deleteSong = (req, res) => {
    Song.findByIdAndUpdate(req.params.id, { status: false }, (err, song) => {
        if (err) {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al eliminar la canción' });
        } else {
            res.status(200).send({ msg: 'Se ha eliminado la canción con éxito' });
        }
    });
};

SongController.uploadFile = (req, res) => {
    var file_name = "Imagen no encontrada";

    if (req.files) {
        var file_path = req.files.file.path;
        var file_split = file_path.split('\/');

        var file_name = file_split[(file_split.length - 1)];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'mp3' || file_ext == 'ogg' || file_ext == 'm4a') {
            Song.findByIdAndUpdate(req.params.id, { file: file_name }, (err, songUpdate) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error al subir el archivo de la cancion');
                } else {
                    if (!songUpdate) {
                        res.status(404).send({ msg: "Ocurrió un error al actualizar el archivo de la cancion" });
                    } else {
                        res.status(200).send({ msg: "Se ha actualizado el archivo de la cancion con éxito" });
                    }
                }
            });
        } else {
            res.status(200).send({ msg: "La extension del archivo no es correcta" });
        }
    } else {
        res.status(200).send({ message: "No se ha podido subir ningún archivo " });
    }
};

SongController.getSongFile = (req, res) => {
    var file = req.params.file;
    var path_file = './server/uploads/songs/' + file

    fs.exists(path_file, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: "No existe el archivo" });
        }
    });
};

module.exports = SongController;