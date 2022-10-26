const mongoose = require("mongoose");

const productoSchema = mongoose.Schema({
    nombre: { type: String, maxLength: 40, require: true, unique: true },
    marca: { type: String, maxLength: 25, require: true, unique: true },
    precio: { type: Number, require: true },
    keywords: { type: [String], maxLength: 20, require: true},
    categoria: { type: [String], maxLength: 40, require: true },
    disponibilidad: { type: Boolean, require: true },
    imagen: {type: String, require: true, unique: true}
});

module.exports = mongoose.model("productos", productoSchema);