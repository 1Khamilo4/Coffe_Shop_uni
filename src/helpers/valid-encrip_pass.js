
import bcryptjs from "bcryptjs"

const encriptarPass = async(password="")=>{

    const salt = bcryptjs.genSaltSync();

    return bcryptjs.hashSync(password, salt );
}

const validarPass = async(password='', usuario={})=>{

    return bcryptjs.compareSync(password, usuario.password);
}


export{
    validarPass,
    encriptarPass
}