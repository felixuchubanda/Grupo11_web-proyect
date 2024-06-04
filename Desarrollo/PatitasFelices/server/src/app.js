import express from 'express'
import indexModel from './models/index.model.js'
import routes from './routes/index.routes.js';

const app = express()

app.use(express.json());

// Usa las rutas
app.use('/api', routes);

export default app