import { Router } from 'express';
import {
    createRecursoedu,
    getAllRecursosedu,
    getRecursoeduById,
    updateRecursoedu,
    deleteRecursoedu
} from '../../controllers/index.js';

const router = Router();

router.post('/', createRecursoedu);
router.get('/', getAllRecursosedu);
router.get('/:id', getRecursoeduById);
router.put('/:id', updateRecursoedu);
router.delete('/:id', deleteRecursoedu);

export default router;
