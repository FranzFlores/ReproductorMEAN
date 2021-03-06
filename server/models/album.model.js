'use strict'

const mongoose = require('mongoose');
const { Schema } = mongoose;

var albumSchema = new Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    image: { type: String, required: true },
    gender: { type: String, required: true },
    status: { type: Boolean, required: true, default: true },
    artistId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist"
    },
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song"
    }]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model("Album", albumSchema);