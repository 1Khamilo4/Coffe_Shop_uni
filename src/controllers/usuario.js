import {request, response} from "express";
import { encriptarPass } from "../helpers/valid-encrip_pass.js";
import { Usuario } from "../models/index.js";

const get_usuarios = async(req=request, res=response)=>{

    const {desde=0, hasta=5} = req.query;

    const [totalRegistros, usuarios] = await Promise.all([
        Usuario.countDocuments({estado:true}),
        Usuario.find({estado:true}).skip(desde).limit(hasta)
    ])


    res.json({
        totalRegistros,
        usuarios
    })
    
}


const get_usuario = async(req=request, res=response)=>{

    const {id} = req.params;

    const usuario = await Usuario.findById(id);

    res.json({
        usuario
    })
    
}

const post_usuarios = async(req=request, res=response)=>{

    const {password, estado, google, ...data} = req.body;

    const new_usuario = new Usuario(data);

    const encoded_pass = await encriptarPass(password);

    new_usuario.password = encoded_pass;

    await new_usuario.save();

    res.json({
        new_usuario
    })
    
    
}

const put_usuarios = async(req=request, res=response)=>{

    const {id} = req.params;

    const {estado, google, password, correo, ...data} = req.body;

    const usuario_update =  await Usuario.findByIdAndUpdate(id,data, {new: true});

    if(password){
        usuario_update.password = await encriptPass(password);
        await usuario_update.save();
    }

    res.json({
        id,
        usuario_update
    })
    
}

const del_usuarios = async(req=request, res=response)=>{
    
    const {id} = req.params;
    /* const usuario_del = await Usuario.findByIdAndDelete(id); */

    
    const usuario_del = await Usuario.findByIdAndUpdate(id, {estado:false}, {new:true})


    const {uid, usuario_auth} = req;

    res.json({
        usuario_del,
        uid,
        usuario_auth
    })
    
    
}


export{
    get_usuarios,
    get_usuario,
    post_usuarios,
    put_usuarios,
    del_usuarios
}