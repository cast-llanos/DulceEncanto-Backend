const { default: mongoose } = require("mongoose");

const username = "admin";
const password = "admin";
const database = "DulceEncanto";
const URI = "mongodb+srv://"+username+":"+password+"@cluster0.zli9urh.mongodb.net/"+database+"?retryWrites=true&w=majority";

const conectar = () =>{
    try {
        mongoose.connect(URI)
        console.log("Atlas está conectado")
        
    } catch (error) {
        console.log("Error en la conexion.."+error)
    }
    conectar();
    module.exports=mongoose;
}