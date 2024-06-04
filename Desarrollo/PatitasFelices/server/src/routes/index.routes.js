import { Router } from 'express';
import adoptanteRoutes from './patitasfelices/adoptante.routes.js';
import criterioRoutes from './patitasfelices/criterio.routes.js';
import estadoRoutes from './patitasfelices/estado.routes.js';
import perroRoutes from './patitasfelices/perro.routes.js';
import recursoeduRoutes from './patitasfelices/recursoedu.routes.js';
import solicitudadopRoutes from './patitasfelices/solicitudadop.routes.js';
import testRoutes from './patitasfelices/test.routes.js';
import usuarioRoutes from './patitasfelices/usuario.routes.js';

const router = Router();

router.use('/adoptantes', adoptanteRoutes);
router.use('/criterios', criterioRoutes);
router.use('/estados', estadoRoutes);
router.use('/perros', perroRoutes);
router.use('/recursosedu', recursoeduRoutes);
router.use('/solicitudesadopcion', solicitudadopRoutes);
router.use('/tests', testRoutes);
router.use('/usuarios', usuarioRoutes);

export default router;
