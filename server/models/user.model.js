'use strict'
//Esquema para los usuarios en la BBDD
const mongoose = require('mongoose');
const { Schema } = mongoose;

var userSchema = new Schema({
    name: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, required: true },
    status: { type: Boolean, required: true, default: true }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model("User", userSchema);