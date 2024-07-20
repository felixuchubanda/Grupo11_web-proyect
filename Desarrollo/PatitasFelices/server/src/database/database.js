import Sequelize from 'sequelize' 
import variableConfig from '../config/index.config.js'
export const sequelize= new Sequelize (
    variableConfig.dbDatabase,
    variableConfig.dbUser,
    variableConfig.dbPassword,
    {
        host:variableConfig.dbServer,
        dialect:variableConfig.dbDialect,
        port:variableConfig.dbPort,
        logging: false,
    }
)
