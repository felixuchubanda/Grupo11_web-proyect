// src/app.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes/index.js';  // Asegúrate de que la ruta sea correcta

const app = express();

// Configura CORS para permitir solicitudes desde http://localhost:3001
const corsOptions = {
  origin: 'http://localhost:3001',
};

app.use(cors(corsOptions));
app.use(express.json());

// Configurar la carpeta de cargas estáticas
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Asegúrate de servir la carpeta de cargas estáticas

// Usa las rutas
app.use('/api', routes);

export default app;
