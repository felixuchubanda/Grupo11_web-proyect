import { Router } from 'express';
import { createAdoptante, getAdoptantes, getAdoptanteById, updateAdoptante, deleteAdoptante } from '../../controllers/patitasfelices/adoptante.controller.js';

const router = Router();

router.post('/', createAdoptante);
router.get('/', getAdoptantes);
router.get('/:id', getAdoptanteById);
router.put('/:id', updateAdoptante);
router.delete('/:id', deleteAdoptante);

export default router;
