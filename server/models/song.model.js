'use strict'

const mongoose = require('mongoose');
const { Schema } = mongoose;

var songSchema = new Schema({
    title: { type: String, required: true },
    number: { type: Number, required: true },
    playlists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Playlist"
    }]  
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = mongoose.model("Song",albumSchema);