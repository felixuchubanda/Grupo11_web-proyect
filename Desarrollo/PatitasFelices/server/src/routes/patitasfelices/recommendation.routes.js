// src/routes/patitasfelices/recommendation.routes.js
import express from 'express';
import { getRecommendations, 
    getVisitorRecommendations,
    getAdoptanteByUsuarioId,
    updateAdoptantePreferences,
    createAdoptionRequest  
} from '../../controllers/patitasfelices/recommendation.controller.js';

const router = express.Router();

router.post('/recomendar', getRecommendations);
router.post('/recomendar-visitante', getVisitorRecommendations);
router.get('/adoptantes/usuario/:id_usuario', getAdoptanteByUsuarioId);
router.put('/adoptantes/:id_adoptante', updateAdoptantePreferences);
router.post('/solicitudes', createAdoptionRequest);

export default router;
