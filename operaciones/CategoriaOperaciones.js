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

// Consultar por queries
CategoriaOperaciones.consultarCategorias = async(require, response) =>{
    
    try {
        const filtro = require.query;
        let listaCategorias;

        if (filtro.q != null) {
            listaCategorias = await CategoriaModelo.find({
                    "$or" : [
                        {"nombre": {$regex: filtro.q, $options: "i"}},
                        //{"habilitado": {$regex: filtro.q, $options: "i"}}
                    ]
                });
        } else {
            listaCategorias = await CategoriaModelo.find(filtro);
        }

        if(listaCategorias.length > 0){
            response.status(200).send(listaCategorias);
        }else{
            response.status(404).send("No hay datos");
        }

    } catch (error) {
        response.status(400).send("Mala Petición: " + error);
    }
}

// Consulta por Id
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

    try {
        const id = require.params.id;
        const body = require.body;

        const categoria = {
            nombre: body.nombre,
            habilitado: body.habilitado
        }
        //console.log(categoria);

        const categoriaActualizada = await CategoriaModelo.findByIdAndUpdate(id, categoria, { new: true });

        if(categoriaActualizada != null){
            response.status(200).send(categoriaActualizada);
        }else{
            response.status(404).send("No hay datos");
        }
    } catch (error) {
        response.status(400).send("Mala petición. " + error);
    }
}

CategoriaOperaciones.eliminarCategoria = async(require, response) =>{

    try {
        const id = require.params.id;
        const categoriaBorrada = await CategoriaModelo.findByIdAndDelete(id);

        if(categoriaBorrada != null){
            response.status(200).send(categoriaBorrada);
        }else{
            response.status(404).send("No hay datos");
        }

    } catch (error) {
        response.status(400).send("Mala petición. "+ error);
    }
}
    
module.exports = CategoriaOperaciones;