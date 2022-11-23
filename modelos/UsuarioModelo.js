const mongoose = require("mongoose");

const usuarioSchema = mongoose.Schema({
    nombre: { type: String, maxLength: 50, require: true },
    apellido: { type: String, maxLength: 50, require: true },
    documento: { type: String, maxLength: 20, require: true, unique: true },
    telefono: { type: String, maxLength: 12, require: true},
    email: { type: String, maxLength: 100, require: true, unique: true},
    password: { type: String, require: true },
    username: { type: String, maxLength: 10, require: true, unique: true },
});

module.exports = mongoose.model("usuarios", usuarioSchema);