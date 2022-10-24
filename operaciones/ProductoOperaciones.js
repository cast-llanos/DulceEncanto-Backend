//Métodos CRUD
const ProductoModelo = require("../modelos/ProductoModelo");
const ProductoOperaciones = {};

// Asincrónicos pues deben esperar la conexión a la BD
// Protocolo HTTP
ProductoOperaciones.crearProducto = async(require, response) => {
    try {
        const objeto = require.body;

        const producto = new ProductoModelo(objeto);
        const productoGuardado = await producto.save();
        response.status(201).send(productoGuardado);
        
    } catch (error) {
        response.status(400).send("Mala Petición: " + error);
    }

}

ProductoOperaciones.consultarProductos = async(require, response) =>{
    
    try {
        const listaProductos = await ProductoModelo.find();

        if(listaProductos.length > 0){
            response.status(200).send(listaProductos);
        }else{
            response.status(404).send("No hay datos");
        }
    } catch (error) {
        response.status(400).send("Mala Petición: " + error);
    }
}

ProductoOperaciones.consultarProducto = async(require, response) =>{

    try {
        const id = require.params.id;
        const producto = await ProductoModelo.findById(id);

        if(producto != null){
            response.status(200).send(producto);
        }else{
            response.status(404).send("No hay datos");
        }
    } catch (error) {
        response.status(400).send("Mala Petición: " + error);
    }
    
}

ProductoOperaciones.modificarProducto = async(require, response) =>{
    
}

module.exports = ProductoOperaciones;