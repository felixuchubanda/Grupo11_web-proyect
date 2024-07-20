import { Router } from 'express';
import {
    createUsuario,
    getAllUsuarios,
    getUsuarioById,
    updateUsuario,
    deleteUsuario,
    loginUsuario
} from '../../controllers/index.js';

const router = Router();

router.post('/', createUsuario);
router.get('/', getAllUsuarios);
router.get('/:id', getUsuarioById);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);
router.post('/login', loginUsuario);

export default router;
