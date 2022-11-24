const UsuarioModelo = require("../modelos/UsuarioModelo");
const bcrypt = require("bcrypt");
const LoginOperaciones = {};
/*const jwt = require("jsonwebtoken");
const SECRET_KEY = "C4ndyCru5h#Dulc30nl1n3"; 
const EXPIRE_TIME = "10m"; 
*/

// Método para comparar datos cifrados por BCRYPT
const compararPassword = async (recibido, guardado) => {

    return await bcrypt.compare(recibido, guardado);
}

/*
const generarToken = (id, nombres, es_admin) => {
    return jwt.sign({id: id, nombres: nombres, es_admin: es_admin}, SECRET_KEY, {expiresIn: EXPIRE_TIME});
}
const verificarToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);    
    } catch (error) {
        return null;
    }
}
*/

LoginOperaciones.login = async(require, response) => {

    try {

        const email = require.body.email;
        const username = require.body.username;
        let password = require.body.password;
        let usuario;

        if(email != null){

            usuario = await UsuarioModelo.findOne({ email : email });
        }else if(username != null){

            usuario = await UsuarioModelo.findOne({ username : username });
        }
        
        if (usuario != null) {

            const verifica = await compararPassword(password, usuario.password);

            if (verifica) {

                const acceso = {
                    nombres: usuario.nombre + " " + usuario.apellido,
                    username: usuario.username
                    //token: generarToken(usuario.id, usuario.nombres+" "+usuario.apellidos, usuario.es_admin)
                }

                response.status(200).json(acceso);
            }else{

                response.status(401).send("Incorrect email or password. Try again");    
            }
        }
        else {

            response.status(401).send("Incorrect email or password. Try again");    
        }
    }catch(error) {

        console.log(error);
        response.status(400).json(error);
    }
}

/*LoginOperaciones.autorizar = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        const data = verificarToken(token);
        if (data != null) {
            res.status(202).send("Aceptado");
        }
        else {
            res.status(403).send("No autorizado");
        }
    }
    else {
        res.status(403).send("No autorizado");
    }
}
*/

module.exports = LoginOperaciones;