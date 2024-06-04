import { Router } from 'express';
import { createEstado, getEstados, getEstadoById, updateEstado, deleteEstado } from '../../controllers/patitasfelices/estado.controller.js';

const router = Router();

router.post('/', createEstado);
router.get('/', getEstados);
router.get('/:id', getEstadoById);
router.put('/:id', updateEstado);
router.delete('/:id', deleteEstado);

export default router;
