// src/routes/patitasfelices/hola.routes.js

import { Router } from 'express';

const router = Router();

router.get('/hola', (req, res) => {
  res.json({ mensaje: '¡Hola Mundo!' });
});

export default router;
