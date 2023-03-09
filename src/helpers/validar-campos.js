import { Usuario } from "../models/index.js";

const emailExist = async(correo="")=>{

    const email_exist = await Usuario.findOne({correo});

    if(email_exist){
        throw new Error("Este correo ya existe");
    }

}

const idExist = async(id="")=>{

    const id_exist = await Usuario.findById(id);

    if(!id_exist || !id_exist.estado){
         throw new Error(`El id ${id} no es valido`)
    }    
}
export{
    emailExist,
    idExist
}