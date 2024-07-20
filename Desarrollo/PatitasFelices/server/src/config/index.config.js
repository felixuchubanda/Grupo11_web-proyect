import * as dotenv from 'dotenv';

dotenv.config();

const variableConfig = {
    host: process.env.HOST || "localhost",
    port: process.env.PORT || 3000,
    dbUser: process.env.DB_USER || "",
    dbPassword: process.env.DB_PASSWORD || "",
    dbServer: process.env.DB_SERVER || "",
    dbDatabase: process.env.DB_DATABASE || "",
    dbDialect: process.env.DB_DIALECT || "postgres",
    dbPort: process.env.DB_PORT || "",
    dbName: process.env.DB_NAME || "",
    tokenSecreto: process.env.TOKENSECRETO || "",
};

export default variableConfig;
