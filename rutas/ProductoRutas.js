const router = require("express").Router();
const ProductoOperaciones = require("../operaciones/ProductoOperaciones");

// Consultas: Método GET
//         Ruta a utilizar (raíz)
router.get("/", ProductoOperaciones.consultarProductos);
router.get("/:id", ProductoOperaciones.consultarProducto);

// Crear: Método POST
router.post("/", ProductoOperaciones.crearProducto);

module.exports = router;