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
        const filtro = require.query;
        let listaProductos;

        if (filtro.nombre != null) {
            listaProductos = await ProductoModelo.find({
                    "$or":[
                        {"nombre":{$regex: filtro.nombre, $options: "i"}}
                    ]
                });
        } else {
            listaProductos = await ProductoModelo.find();
        }

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

    try {
        const id = require.params.id;
        const body = require.body;

        const producto = {
            nombre: body.nombre,
            precio: body.precio,
            precio: body.keywords
        }
        console.log(producto);

        const productoActualizado = await ProductoModelo.findByIdAndUpdate(id, producto, { new: true });

        if(productoActualizado != null){
            response.status(200).send(productoActualizado);
        }else{
            response.status(404).send("No hay datos");
        }
    } catch (error) {
        response.status(400).send("Mala petición. " + error);
    }
}

ProductoOperaciones.eliminarProducto = async(require, response) =>{

    try {
        const id = require.params.id;
        const productoBorrado = await ProductoModelo.findByIdAndDelete(id);

        if(productoBorrado != null){
            response.status(200).send(productoBorrado);
        }else{
            response.status(404).send("No hay datos");
        }

    } catch (error) {
        response.status(400).send("Mala petición. "+ error);
    }
}

module.exports = ProductoOperaciones;