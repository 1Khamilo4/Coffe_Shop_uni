import express from "express";
import exphbs from "express-handlebars";
import session from "express-session";
import {join} from "path";
import MethodOverride  from "method-override";
import cors from "cors";
import { conexion_db } from "../db-conexion/conexion-db.js";

import router_user from "../routers/usuario.js";
import router_index from "../routers/index.js";
import router_auth from "../routers/auth.js";

export default class Server{

    constructor(){

        this.app = express();
        this.port = process.env.PORT;

        
        //Settings
        this.settings();        

        //Middleware
        this.middlewares();

        //Conexion DB
        this.conexionDB();

        //Listen 
        this.listen();

        //Routers
        this.routers();


    }

    settings(){

        //Configurar la carpeta views
        this.app.set("views");

        //Configurar el motor de las vistas
        const hbs = exphbs.create({
            defaultLayout: "main",
            layoutsDir: join(this.app.get("views"), "layouts"),
            partialsDir: join(this.app.get("views"), "partials"),
            extname: ".hbs"
        });

        this.app.engine(".hbs", hbs.engine);
        this.app.set("view engine", ".hbs");

    }

    middlewares(){

        this.app.use(express.json());

        this.app.use(cors());

        this.app.use(express.static("public"));

        this.app.use(express.urlencoded({extended:false}));

        this.app.use(MethodOverride('_method'));
        this.app.use(session({
            secret: 'mysecret app',
            resave:true,
            saveUninitialized: true
        }));
    }

    async conexionDB(){
        await conexion_db()
    }

    routers(){

        //Index
        this.app.use("/", router_index);

        //Auth
        this.app.use("/auth", router_auth)

        //User
        this.app.use("/usuarios", router_user);
    }


    listen(){

        this.app.listen(this.port, (err)=>{

            if(err){
                throw new Error(`Error en lanzar el servidor: ${err}`.red);
            }

            console.log(`App online on: http://localhost:${this.port}`.blue);

        })
    }
}