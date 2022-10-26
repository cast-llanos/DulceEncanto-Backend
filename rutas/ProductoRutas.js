const router = require("express").Router();
const ProductoOperaciones = require("../operaciones/ProductoOperaciones");

// Consultas: Método GET
//         Ruta a utilizar (raíz)
router.get("/", ProductoOperaciones.consultarProductos);
router.get("/:id", ProductoOperaciones.consultarProducto);

// Crear: Método POST
router.post("/", ProductoOperaciones.crearProducto);

//Actualizar: Método PUT
router.put("/:id", ProductoOperaciones.modificarProducto);

//Eliminar: Método DELETE
router.delete("/:id", ProductoOperaciones.eliminarProducto);

module.exports = router;
