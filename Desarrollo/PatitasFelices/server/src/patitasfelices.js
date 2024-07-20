//src/patitasfelices.js
import app from './app.js'
import variableConfig from './config/index.config.js'
import { sequelize } from './database/database.js'

async function startServer(port) {
    try {
        // Comprobacion y alerta de la conexion con la base de datos.
        await sequelize.sync({ force: false, logging: false, alter: true });
        sequelize
            .authenticate()
            .then(() => {


                // configura el puerto para escuchar peticiones
                console.log("Servidor: ", process.env.NODE_ENV)
                app.listen(port);
                console.log('El servidor está escuchando en el puerto: ', port, ' 🚀📡☄️');
                console.log('La conexión se ha establecido correctamente 👽🪄');

            })
            .catch((err) => {
                console.error("No se ha podido conectar a la base de datos 🩻:", err)
            })

        // configura el puerto para escuchar peticiones

        // Si esta en produccion toma configuracion diferente respecto SSL
        console.log("NODE_ENV: ", process.env.NODE_ENV)
        if (process.env.NODE_ENV !== "production") {
            console.log("\n\n>> DEV\n\n")
            try {
                console.log("Server on http://localhost:" + port)
            } catch (error) {
                console.log("Is not a DEV enviroment: ")
            }
        } else {
            console.log("\n\n>> PRODUCTION\n\n")
            app.listen(port)
            console.log("Server on port: ", port)
        }
    } catch (error) {
        console.log("Error al conectar a la base de datos 😢: ", error)
    }
}

// Start server main
startServer(variableConfig.port)

export default { startServer }