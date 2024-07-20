import { Router } from 'express';
import {
    createUsuario,
    getAllUsuarios,
    getUsuarioById,
    updateUsuario,
    deleteUsuario,
    loginUsuario,
    solicitarRestablecimientoContrasena,
    restablecerContrasena
} from '../../controllers/index.js';

const router = Router();

router.post('/', createUsuario);
router.get('/', getAllUsuarios);
router.get('/:id', getUsuarioById);
router.put('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);
router.post('/login', loginUsuario);
router.post('/solicitar-restablecimiento-contrasena', solicitarRestablecimientoContrasena);
router.post('/restablecer-contrasena', restablecerContrasena);

export default router;
