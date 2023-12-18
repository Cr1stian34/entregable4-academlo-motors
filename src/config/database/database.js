import { Sequelize } from "sequelize";
import envs from "../enviroments/enviroments.js";

export const sequelize = new Sequelize(envs.DB_URL, {
    logging: false
})

export const authenticated = async () => {
    try {
        await sequelize.authenticate();
        console.log("Se a autenticado satisfactoriamente :)")
    } catch (error) {
        console.log(error)
    }
}

export const syncUp = async () => {
    try {
        //aqui va el force true dentro del sync({force: true}) esto sirve para añadir tablas en la base de dato pero borra todos los datos
        await sequelize.sync();
        console.log("La conecion se sincronizo satisfactoriamente ;)")
    } catch (error) {
        console.log(error)
    }
}

