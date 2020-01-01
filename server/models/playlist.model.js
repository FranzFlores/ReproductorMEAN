'use strict'

const mongoose = require('mongoose');
const { Schema } = mongoose;

var playlistSchema = new Schema({
    name: {type:String,required: true},
    description: {type:String,required:true},
    image: {type: String},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    } 
},{timestamps: {createdAt: 'created_at',updatedAt: 'updated_at'}});

module.exports = mongoose.model("Playlist",playlistSchema);

