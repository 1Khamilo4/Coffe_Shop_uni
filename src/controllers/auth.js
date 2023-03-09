import {request, response} from "express";
import { validarPass } from "../helpers/valid-encrip_pass.js";
import { Usuario } from "../models/index.js";



const get_loginVista = async(req=request, res=response)=>{

    res.render("auth/login")

}


const post_login = async(req=request, res=response)=>{
    const {correo, password} = req.body;
    const errors =[];

    try{
        //Verificar si el correo existe
        const usuario =  await Usuario.findOne({correo});

        if(!usuario){
            errors.push({msg:"El correo / contraseña no son validos - correo"});
            return res.status(404).render("auth/login",{errors});
        }

        //Si el usuario esta activo
        if(!usuario.estado){
            errors.push({msg:"El correo / contraseña no son validos - estado"});
            return res.status(404).render("auth/login",{errors});
        }

        //Verificar la contraseña 
        const valid_password  = await validarPass(password, usuario);

        if(!valid_password){
            errors.push({msg:"El correo / contraseña no son validos - password"});
            return res.status(404).render("auth/login",{errors});
        }

        

        res.send("ok")

    }catch(err){
        
        console.log(err);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }



    

}

export{
    post_login,
    get_loginVista
}