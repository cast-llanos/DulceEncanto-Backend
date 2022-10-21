//IMPORTACIONES
const express=require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("./conexion")

//CONFIGURACIONES
const env = process.env;// captura el puerto
const port = env.PORT || 8000;
const app = express();
app.use(morgan("dev"));//Monitor morgan para ver codigos de respuesta utiliza formato "dev(desarrollador)"
app.use(cors());

//ARRANQUE
app.listen(port,()=>{
    console.log("API iniciado en el puerto "+port);
})

//RUTAS GET
app.get("/", (req, res)=>{
    res.send("API iniciado......");
})