import mongoose from "mongoose";

const conexion_db = async()=>{

    try{

        mongoose.set('strictQuery', false);

        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        }, ()=>{
            console.log("Base de datos conectado".yellow);
        })

    }catch(err){

        throw new Error(`Error en la conexion de la DB ${err}`.red)
    }


}

export{
    conexion_db
}