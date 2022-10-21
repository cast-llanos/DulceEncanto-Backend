const mongoose = require("mongoose");

const categoriaSchema = mongoose.Schema({
    nombre: { type: String, maxLength: 40, require: true, unique: true },
    habilitado: { type: Boolean, require: true }
});

module.exports = mongoose.model("categorias", categoriaSchema);
