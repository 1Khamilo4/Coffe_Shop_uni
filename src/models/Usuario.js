import {Schema, model} from "mongoose";

const UsuarioSchema = new Schema({

    nombre: {type:String, require:[true, "El nombre es obligatorio"]},
    correo: {type:String, require:[true, "El correo es obligatorio"], unique:true},
    password: {type:String, require:[true, "La contraseña es obligatoria"]},
    rol: {type:String, require:true, enum:['ADMIN_ROL', 'USER_ROL', 'VENTAS_ROL']},
    google:{type:Boolean, default:false},
    estado:{type:Boolean, default:true}
    
})

export default model("Usuario", UsuarioSchema );

