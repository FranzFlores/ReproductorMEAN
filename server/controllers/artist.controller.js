'use strict'

var Artist = require('../models/artist.model');
var ArtistController = {};

ArtistController.createArtist = (req, res) => {
    new Artist({
        name: req.body.name,
        description: req.body.description,
        image: 'null',
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
    Artist.find({status:true}).populate({path:'albums',model:'Album',select:'title'}).exec((err, artists) => {
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
    Artist.findByIdAndUpdate(req.params.id, {status:false}, (err, artist) => {
        if (err) {
            console.log(err);
            res.status(500).send({ msg: 'Ocurrió un error al eliminar artistas' });
        } else {
            console.log(artist);
            res.status(200).send({ msg: 'Se ha eliminado el artista con éxito' });
        }
    });
};


module.exports = ArtistController;
