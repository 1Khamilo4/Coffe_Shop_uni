import {Router} from "express";
import {check} from "express-validator";
import { get_loginVista, post_login } from "../controllers/auth.js";
import { validar_valuesLogin } from "../middlewares/validar-values.js";
const router = Router();

router.get("/login",get_loginVista);

router.post("/login",[
    check("correo", "Correo invalido").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validar_valuesLogin
],post_login);



export default router