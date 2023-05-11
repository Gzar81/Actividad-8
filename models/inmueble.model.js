const { model, Schema } = require('mongoose');

const imuebleSchema = new Schema({
    piso: String,
    letra: String,
    extension: Number,
    numHabitaciones: Number,
    alquilado: Boolean,
    nombrePropietario: String,
    emailContacto: String

}, { timestamps: true, versionKey: false });

module.exports = model('inmueble', imuebleSchema);