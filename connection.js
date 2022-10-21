// Librería para la conexión con la BD
const mongoose = require("mongoose");

const username = "admin";
const password = "admin";
const database = "DulceEncanto";
// Identificador único/particular de la BD con MongoDB
const URI = "mongodb+srv://" + username + ":" + password + "@clusterdulceencanto.5mg0ozd.mongodb.net/" + database + "?retryWrites=true&w=majority"

const conectar = async() => {

    try {
        await mongoose.connect(URI);
        console.log(":::: Conexión establecida: Atlas en línea ::::")
    } catch (error) {
        console.log("::: Error en la conexión :::: " + error)
    }

    /*
    // Método 2: Encadenamiento de métodos
    mongoose.connect(URI)
            .then(()=>{console.log(":::: Conexión establecida ::::")})
            .catch((error)=>{console.log("::: Error en la conexión ::::")})
    */
    
}

conectar();

// Exportar el módulo
module.exports = mongoose



