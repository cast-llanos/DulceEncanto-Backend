const { default: mongoose } = require("mongoose");

const username = "admin";
const password = "admin";
const database = "DulceEncanto";
const URI = "mongodb://"+username+":"+password+@ac-bjc87ss-shard-00-00.5mg0ozd.mongodb.net:27017,ac-bjc87ss-shard-00-01.5mg0ozd.mongodb.net:27017,ac-bjc87ss-shard-00-02.5mg0ozd.mongodb.net:27017/+database+?ssl=true&replicaSet=atlas-gaweut-shard-0&authSource=admin&retryWrites=true&w=majority";

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