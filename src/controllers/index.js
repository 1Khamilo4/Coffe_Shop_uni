import {request, response} from "express";

const get_index = async(req=request, res=response)=>{
    res.render("index");
}

export{
    get_index
}