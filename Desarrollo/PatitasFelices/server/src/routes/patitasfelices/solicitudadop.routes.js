import { Router } from 'express';
import {
    createSolicitudAdopcion,
    getAllSolicitudesAdopcion,
    getSolicitudAdopcionById,
    updateSolicitudAdopcion,
    deleteSolicitudAdopcion,
    getDevoluciones // Importa el controlador getDevoluciones
} from '../../controllers/index.js';

const router = Router();

router.post('/', createSolicitudAdopcion);
router.get('/', getAllSolicitudesAdopcion);
router.get('/devoluciones', getDevoluciones); // Define la ruta para devoluciones antes de la ruta con parámetro
router.get('/:id', getSolicitudAdopcionById);
router.put('/:id', updateSolicitudAdopcion);
router.delete('/:id', deleteSolicitudAdopcion);

export default router;
