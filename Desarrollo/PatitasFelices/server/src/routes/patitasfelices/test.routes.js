import { Router } from 'express';
import { createTest, getTests, getTestById, updateTest, deleteTest } from '../../controllers/patitasfelices/test.controller.js';

const router = Router();

router.post('/', createTest);
router.get('/', getTests);
router.get('/:id', getTestById);
router.put('/:id', updateTest);
router.delete('/:id', deleteTest);

export default router;
