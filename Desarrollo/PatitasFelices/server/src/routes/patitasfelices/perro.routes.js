import { Router } from 'express';
import {
    createPerro,
    getAllPerros,
    getPerroById,
    updatePerro,
    deletePerro,
    getPerrosPorTamano,
    getPerrosPorEstado,
    getPerrosPorRaza,
    getPerrosPorEdad,
    getPerrosOrdenadosPorNombre,
} from '../../controllers/index.js';

const router = Router();

router.post('/', createPerro);
router.get('/', getAllPerros);
router.get('/:id', getPerroById);
router.put('/:id', updatePerro);
router.delete('/:id', deletePerro);
router.get('/tamano/:tamano', getPerrosPorTamano);
router.get('/estado/:estado', getPerrosPorEstado);
router.get('/raza/:raza', getPerrosPorRaza); 
router.get('/edad/:edad', getPerrosPorEdad); 
router.get('/ordenados/nombre', getPerrosOrdenadosPorNombre);

export default router;
