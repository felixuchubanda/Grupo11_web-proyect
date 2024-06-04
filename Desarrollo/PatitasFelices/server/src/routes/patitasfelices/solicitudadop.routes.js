import { Router } from 'express';
import { createSolicitudAdopcion, getSolicitudesAdopcion, getSolicitudAdopcionById, updateSolicitudAdopcion, deleteSolicitudAdopcion } from '../../controllers/patitasfelices/solicitudadop.controller.js';

const router = Router();

router.post('/', createSolicitudAdopcion);
router.get('/', getSolicitudesAdopcion);
router.get('/:id', getSolicitudAdopcionById);
router.put('/:id', updateSolicitudAdopcion);
router.delete('/:id', deleteSolicitudAdopcion);

export default router;
