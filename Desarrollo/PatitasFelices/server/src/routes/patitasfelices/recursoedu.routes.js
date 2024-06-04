import { Router } from 'express';
import { createRecursoedu, getRecursosedu, getRecursoeduById, updateRecursoedu, deleteRecursoedu } from '../../controllers/patitasfelices/recursoedu.controller.js';

const router = Router();

router.post('/', createRecursoedu);
router.get('/', getRecursosedu);
router.get('/:id', getRecursoeduById);
router.put('/:id', updateRecursoedu);
router.delete('/:id', deleteRecursoedu);

export default router;
