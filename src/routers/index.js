import {Router} from "express";
import { get_index } from "../controllers/index.js";

const router = Router();


router.get("/", get_index)


export default router;