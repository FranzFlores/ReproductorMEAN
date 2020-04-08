'use strict'

const mongoose = require('mongoose');
const { Schema } = mongoose;

var artistSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    albums: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album"
    }],
    status: { type: Boolean, required: true, default: true }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model("Artist",artistSchema);