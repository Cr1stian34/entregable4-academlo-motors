//1. exportar expres
import express from "express"
import { router } from "./routes/index.js";
import { globalHandleError } from "./common/errors/error.controller.js";
import { AppError } from "./common/errors/appError.js";
import morgan from "morgan";
import envs from "./config/enviroments/enviroments.js";
import { enableCors } from "./config/plugins/cors.plugin.js";

//2. Crea una constante app que tendra todas las fucionalidades

const app = express();
const ACCEPTED_ORIGINS = ["http://localhost:8080"];

//Utilizar los midelwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

enableCors(app, ACCEPTED_ORIGINS)

if(envs.NODE_ENV === "development"){
    app.use(morgan("dev"))
    console.log("Me estoy ejecutando en desarrollo")
}

if(envs.NODE_ENV === "production"){
    console.log("Me estoy ejecutando en produccion")
}

//rutas
app.use("/api/v1", router)

app.all("*", (req, res, next)=>{

    return next(new AppError(`Cant find ${req.originalUrl} on this server`, 404))
    
})

app.use(globalHandleError)

export default app