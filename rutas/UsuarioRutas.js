const router = require("express").Router();
const UsuarioOperaciones = require("../operaciones/UsuarioOperaciones");

// Consultas: Método GET
//         Ruta a utilizar (raíz)
router.get("/", UsuarioOperaciones.consultarUsuarios);
router.get("/:id", UsuarioOperaciones.consultarUsuario);

// Crear: Método POST
router.post("/", UsuarioOperaciones.crearUsuario);

//Actualizar: Método PUT
router.put("/:id", UsuarioOperaciones.modificarUsuario);

//Eliminar: Método DELETE
router.delete("/:id", UsuarioOperaciones.eliminarUsuario);

module.exports = router;