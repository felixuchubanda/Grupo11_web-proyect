import { Router } from 'express';
import { createPerro, getPerros, getPerroById, updatePerro, deletePerro } from '../../controllers/patitasfelices/perro.controller.js';

const router = Router();

router.post('/', createPerro);
router.get('/', getPerros);
router.get('/:id', getPerroById);
router.put('/:id', updatePerro);
router.delete('/:id', deletePerro);

export default router;
