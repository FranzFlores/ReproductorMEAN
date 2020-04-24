'use strict'

var Playlist = require('../models/playlist.model');
const PlaylistController = {};

PlaylistController.createPlaylist = (req, res) => {

    new Playlist({
        name: req.body.name,
        description: req.body.description,
        image: 'null',
        user: req.body.user,
        songs: req.body.songs
    }).save((err, playlist) => {
        if (err) {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al crear la lista de reproducción' });
        } else {
            if (!playlist) {
                res.status(404).send({ msg: 'No se pudo crear la lista de reproducción' });
            } else {
                res.status(200).send({ msg: 'Se agrego la lista de reproducción con éxito' });
            }
        }
    });
};


PlaylistController.getPlaylists = (req, res) => {
    Playlist.find({ status: true }).populate({ path: 'songs', model: 'Song', select: 'title', match: { status: { $gte: true } } }).exec((err, playlist) => {
        if (err) {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al obtener la lista de reproducción' });
        } else {
            res.status(200).send(playlist);
        }
    });
};


PlaylistController.updatePlaylist = (req, res) => {
    var playlistUpdated = {
        name: req.body.name,
        description: req.body.description,
        songs: req.body.songs
    }

    Playlist.findByIdAndUpdate(req.params.id, playlistUpdated, (err, playlist) => {
        if (err) {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al actualizar la lista de reproducción' });
        } else {
            console.log(playlist);
            res.status(200).send({ msg: 'Se ha actualizado la lista de reproducción con éxito' });
        }
    });
};

PlaylistController.deletePlaylist = (req, res) => {
    Playlist.findByIdAndUpdate(req.params.id, { status: false }, (err, playlist) => {
        if (err) {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al eliminar la lista de reproducción' });
        } else {
            console.log(playlist);
            res.status(200).send({ msg: 'Se ha eliminado la lista de reproducción con éxito' });
        }
    });
};

PlaylistController.uploadImage = (req, res) => {
    var file_name = "Imagen no encontrada";

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\/');

        var file_name = file_split[(file_split.length - 1)];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'jpeg') {
            Playlist.findByIdAndUpdate(req.params.id, { image: file_name }, (err, playlistUpdated) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error al subir la imagen del artista');
                } else {
                    if (!playlistUpdated) {
                        res.status(404).send({ msg: "Ocurrió un error al actualizar la foto de la lista de reproducción" });
                    } else {
                        res.status(200).send({ msg: "Se ha actualizado la lista de reproducción con éxito" });
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

PlaylistController.getImageFile = (req, res) => {
    var imageFile = req.params.imageFile;
    var path_file = './server/uploads/playlists/' + imageFile

    fs.exists(path_file, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({ message: "No existe la imagen" });
        }
    });
};


module.exports = PlaylistController;