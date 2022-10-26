const router = require("express").Router();
const CategoriaOperaciones = require("../operaciones/CategoriaOperaciones");

// Consultas: Método GET
//         Ruta a utilizar (raíz)
router.get("/", CategoriaOperaciones.consultarCategorias);
router.get("/:id", CategoriaOperaciones.consultarCategoria);

// Crear: Método POST
router.post("/", CategoriaOperaciones.crearCategoria);

//Actualizar: Método PUT
router.put("/:id", CategoriaOperaciones.modificarCategoria);

//Eliminar: Método DELETE
router.delete("/:id", CategoriaOperaciones.eliminarCategoria);

module.exports = router;