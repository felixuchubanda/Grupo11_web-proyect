import { AdoptanteService } from '../../services/index.js';

export const createAdoptante = async (req, res) => {
    try {
        const adoptante = await AdoptanteService.createAdoptante(req.body);
        res.status(201).json(adoptante);
    } catch (error) {
        console.error('Error al crear adoptante:', error.message);
        res.status(400).json({ message: error.message });
    }
};

export const getAllAdoptantes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10; // Puedes ajustar el límite de elementos por página
        const offset = (page - 1) * limit;

        const filters = {};

        if (req.query.nombre) filters.nombre = req.query.nombre;
        if (req.query.apellido) filters.apellido = req.query.apellido;
        if (req.query.cedula) filters.cedula = req.query.cedula;

        const result = await AdoptanteService.getAllAdoptantes({ limit, offset, filters });
        const totalAdoptantes = await AdoptanteService.countAllAdoptantes(filters);

        res.json({
            adoptantes: result,
            totalPages: Math.ceil(totalAdoptantes / limit),
            currentPage: page
        });
    } catch (error) {
        console.error('Error fetching adoptantes:', error);
        res.status(500).json({ message: error.message });
    }
};

export const getAdoptanteById = async (req, res) => {
    try {
        const adoptante = await AdoptanteService.getAdoptanteById(req.params.id);
        if (adoptante) {
            res.json(adoptante);
        } else {
            res.status(404).json({ message: 'Adoptante no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateAdoptante = async (req, res) => {
    try {
        const updatedAdoptante = await AdoptanteService.updateAdoptante(req.params.id, req.body);
        if (updatedAdoptante) {
            res.json(updatedAdoptante);
        } else {
            res.status(404).json({ message: 'Adoptante no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteAdoptante = async (req, res) => {
    try {
        const deleted = await AdoptanteService.deleteAdoptante(req.params.id);
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Adoptante no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginAdoptante = async (req, res) => {
    try {
        const adoptante = await AdoptanteService.loginAdoptante(req.body.email, req.body.contraseña);
        res.json(adoptante);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const getAdoptanteByCedula = async (req, res) => {
    try {
        const adoptante = await AdoptanteService.getAdoptanteByCedula(req.params.cedula);
        if (adoptante) {
            res.json(adoptante);
        } else {
            res.status(404).json({ message: 'Adoptante no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAdoptantesOrdenadosPorNombre = async (req, res) => {
    try {
        const adoptantes = await AdoptanteService.getAdoptantesOrdenadosPorNombre();
        res.json(adoptantes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
