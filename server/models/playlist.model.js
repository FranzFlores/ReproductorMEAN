'use strict'

const mongoose = require('mongoose');
const { Schema } = mongoose;

var playlistSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    status: {type:Boolean, required:true, default:true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    songs:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song"
    }]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model("Playlist", playlistSchema);

