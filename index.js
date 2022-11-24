// Importaciones
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("./connection")

// Configuraciones
const env = process.env; //Revisar la información de la máquina
const port = env.PORT || 8000;
const app = express();
app.use(express.json());
//Morgan es un monitor de performance: "dev" -> desarrollo
app.use(morgan("dev"));
// Cors habilita conexiones externas
app.use(cors()); 

// Arranque
app.listen(port, () => {
    console.log("API iniciado en el puerto: " + port);
})

// RUTAS
//     Ruta  Parámetros del método get
app.get("/", (request, response) =>{
    response.send("API Iniciado");
})

// Enrutamiento para objeto Categoría
app.use("/api/categorias", require("./rutas/CategoriaRutas"))

// Enrutamiento para objeto Producto
app.use("/api/productos", require("./rutas/ProductoRutas"))

// Enrutamiento para objeto Usuario
app.use("/api/usuarios", require("./rutas/UsuarioRutas"))

// Enrutamiento para objeto Login
app.use("/api/login", require("./rutas/LoginRutas"));
