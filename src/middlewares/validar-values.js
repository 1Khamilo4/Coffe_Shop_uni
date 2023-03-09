import {request, response} from "express";
import { validationResult } from "express-validator";


const validar_valuesLogin = async(req=request, res=response, next)=>{

    const {errors} = validationResult(req);

    if(errors.length > 0){
       return res.render("auth/login", {errors})
    }

    next();
}

const validar_values = async(req=request, res=response, next)=>{

    const errors = validationResult(req);

    if(!errors){
        return res.status(500).json(err)
    }

    next();
}

export{
    validar_valuesLogin,
    validar_values
}