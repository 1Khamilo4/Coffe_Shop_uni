import dotenv from "dotenv";
import colors from "colors";
import { Server } from "./models/index.js"

dotenv.config({
    path: "./config/.env"
})

const main = async()=>{

    new Server();
}

main();