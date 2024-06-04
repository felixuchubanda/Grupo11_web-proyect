import { Router } from 'express';
import { createCriterio, getCriterios, getCriterioById, updateCriterio, deleteCriterio } from '../../controllers/patitasfelices/criterio.controller.js';

const router = Router();

router.post('/', createCriterio);
router.get('/', getCriterios);
router.get('/:id', getCriterioById);
router.put('/:id', updateCriterio);
router.delete('/:id', deleteCriterio);

export default router;
