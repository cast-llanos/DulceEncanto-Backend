const UsuarioModelo = require("../modelos/UsuarioModelo");
const bcrypt = require("bcrypt");
const UsuarioOperaciones = {};

// Método para cifrar constraseñas a través de la libería bcrypt
const cifrarPassword = async (password) => {
    const SALT_TIMES = 10;
    const salt = await bcrypt.genSalt(SALT_TIMES);
    return await bcrypt.hash(password, salt);
}

UsuarioOperaciones.crearUsuario = async(require, response) => {

    try {

        const body = require.body;
        body.password = await cifrarPassword(body.password);
        const usuario = new UsuarioModelo(body);
        const usuarioGuardado = await usuario.save();
        response.status(201).send(usuarioGuardado);
    } catch (error) {

        response.status(400).json(error);
    }
}

UsuarioOperaciones.consultarUsuarios = async(require, response) => {

    try {

        const query = require.query;
        let usuarios;

        if (query.q == null) {
            usuarios = await UsuarioModelo.find(query);
        } 
        else {
            usuarios = await UsuarioModelo.find({
                "$or" : [ 
                    {"nombres": {$regex:query.q, $options:"i"}},
                    {"apellidos": {$regex:query.q, $options:"i"}},
                    {"documento": {$regex:query.q, $options:"i"}},
                    {"email": {$regex:query.q, $options:"i"}},
                    {"username": {$regex:query.q, $options:"i"}}
                ]
            });
        }
        response.status(200).send(usuarios);
    } catch (error) {

        response.status(400).json(error);
    }
}

UsuarioOperaciones.consultarUsuario = async(require, response) => {

    try {

        const id = require.params.id;
        const usuario = await UsuarioModelo.findById(id);

        if (usuario == null) {
            response.status(404).send("No se encontraron datos")    
        }
        else {
            response.status(200).send(usuario);
        }
    } catch (error) {
        response.status(400).json(error);
    }

}

UsuarioOperaciones.modificarUsuario = async(require, response) => {

    try {

        const id = require.params.id;
        const body = require.body;

        if (body.password != null) {
            body.password = await cifrarPassword(body.password);
        }

        const datosModificar = {
            nombre: body.nombre,
            apellido: body.apellido,
            telefono: body.telefono,
            email: body.email,
            password: body.password,
            username: body.username,
        }

        const usuarioModificado = await UsuarioModelo.findByIdAndUpdate(id, datosModificar, {new: true} )

        if (usuarioModificado!= null) {
            response.status(200).send(usuarioModificado);
        }
        else {
            response.status(404).send("No se encontraron datos");
        }
    } catch (error) {

        response.status(400).json(error);
    }
}

UsuarioOperaciones.eliminarUsuario = async(require, response) => {

    try {

        const id = require.params.id;
        const usuarioBorrado = await UsuarioModelo.findByIdAndDelete(id);

        if (usuarioBorrado == null) {
            response.status(404).send("No se encontraron datos"); 
        }
        else {
            response.status(200).send(usuarioBorrado);
        }
    } catch (error) {

        response.status(400).json(error);
    }
}

module.exports = UsuarioOperaciones;