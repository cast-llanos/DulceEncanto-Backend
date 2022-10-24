//Métodos CRUD
const CategoriaModelo = require("../modelos/CategoriaModelo");
const CategoriaOperaciones = {};

// Asincrónicos pues deben esperar la conexión a la BD
// Protocolo HTTP
CategoriaOperaciones.crearCategoria = async(require, response) => {
    try {
        const objeto = require.body;

        const categoria = new CategoriaModelo(objeto);
        const categoriaGuardada = await categoria.save();
        response.status(201).send(categoriaGuardada);
        
    } catch (error) {
        response.status(400).send("Mala Petición: " + error);
    }

}

CategoriaOperaciones.consultarCategorias = async(require, response) =>{
    
    try {
        const listaCategorias = await CategoriaModelo.find();

        if(listaCategorias.length > 0){
            response.status(200).send(listaCategorias);
        }else{
            response.status(404).send("No hay datos");
        }
    } catch (error) {
        response.status(400).send("Mala Petición: " + error);
    }
}

CategoriaOperaciones.consultarCategoria = async(require, response) =>{

    try {
        const id = require.params.id;
        const categoria = await CategoriaModelo.findById(id);

        if(categoria != null){
            response.status(200).send(categoria);
        }else{
            response.status(404).send("No hay datos");
        }
    } catch (error) {
        response.status(400).send("Mala Petición: " + error);
    }
    
}

CategoriaOperaciones.modificarCategoria = async(require, response) =>{
    
}

module.exports = CategoriaOperaciones;