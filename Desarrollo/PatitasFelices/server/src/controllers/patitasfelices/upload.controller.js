// src/controllers/patitasfelices/upload.controller.js
import path from 'path';
import { fileURLToPath } from 'url';

// Importa el middleware de carga
import upload from '../../middleware/upload.js';

// Define la función para manejar la carga de archivos
export const uploadFile = (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Genera la ruta de la imagen
  const imageUrl = `uploads/${file.filename}`;
  res.json({ imageUrl });
};
