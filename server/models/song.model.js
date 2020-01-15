'use strict'

const mongoose = require('mongoose');
const { Schema } = mongoose;

var songSchema = new Schema({
    title: { type: String, required: true },
    number: { type: Number, required: true },
    file: { type: String, required: true },
    reproductions: { type: Number, required: true },
    albumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album"
    },
    playlists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Playlist"
    }],
    status: { type: Boolean, required: true, default: true }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model("Song", songSchema);