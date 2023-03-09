import {Router} from "express";
import { check } from "express-validator";
import { del_usuarios, get_usuarios, post_usuarios, put_usuarios } from "../controllers/usuario.js";
import { emailExist, idExist } from "../helpers/validar-campos.js";
import { validar_values } from "../middlewares/validar-values.js";

const router = Router();

router.get("/", get_usuarios);

router.get("/:id", get_usuarios);

router.post("/",[
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("correo", "no es un correo valido").isEmail(),
    check("correo").custom(emailExist),
    check("password", "El password debe tener minimo 6 caracteres").isLength({min:6}),
    validar_values
],post_usuarios);

router.put("/:id",[
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(idExist),
    validar_values
],put_usuarios)

router.delete("/:id",[
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(idExist),
    validar_values
],del_usuarios)

export default router;