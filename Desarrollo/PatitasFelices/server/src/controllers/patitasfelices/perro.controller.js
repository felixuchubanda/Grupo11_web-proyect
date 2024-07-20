import { PerroService } from '../../services/index.js';

export const createPerro = async (req, res) => {
    try {
        const { nombre, edad, raza, tamano, genero, descripcion, nivel_energia, bueno_con_ninos, bueno_con_mascota, nivel_formacion, id_estado } = req.body;
        const imagen_url = req.body.imagen_url || null;

        const perro = await PerroService.createPerro({
            nombre,
            edad,
            raza,
            tamano,
            genero,
            descripcion,
            nivel_energia,
            bueno_con_ninos,
            bueno_con_mascota,
            nivel_formacion,
            id_estado,
            imagen_url
        });

        res.status(201).json(perro);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllPerros = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10; // Puedes ajustar el límite de elementos por página
        const offset = (page - 1) * limit;

        const filters = {};

        if (req.query.raza) filters.raza = req.query.raza;
        if (req.query.edad) filters.edad = req.query.edad;
        if (req.query.tamano) filters.tamano = req.query.tamano;
        if (req.query.estado) filters.id_estado = req.query.estado;

        const result = await PerroService.getAllPerros({ limit, offset, filters });
        const totalPerros = await PerroService.countAllPerros(filters);

        res.json({
            perros: result,
            totalPages: Math.ceil(totalPerros / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPerroById = async (req, res) => {
    try {
        const perro = await PerroService.getPerroById(req.params.id);
        if (perro) {
            res.json(perro);
        } else {
            res.status(404).json({ message: 'Perro not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePerro = async (req, res) => {
    try {
        const { id } = req.params;
        const perroData = req.body;

        const updatedPerro = await PerroService.updatePerro(id, perroData);
        if (updatedPerro) {
            res.json(updatedPerro);
        } else {
            res.status(404).json({ message: 'Perro not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deletePerro = async (req, res) => {
    try {
        const deleted = await PerroService.deletePerro(req.params.id);
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Perro not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPerrosPorTamano = async (req, res) => {
    try {
        const tamano = req.params.tamano;
        const perros = await PerroService.getPerrosPorTamano(tamano);
        res.json(perros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPerrosPorEstado = async (req, res) => {
    try {
        const estado = req.params.estado;
        const perros = await PerroService.getPerrosPorEstado(estado);
        res.json(perros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPerrosPorRaza = async (req, res) => {
    try {
        const raza = req.params.raza;
        const perros = await PerroService.getPerrosPorRaza(raza);
        res.json(perros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPerrosPorEdad = async (req, res) => {
    try {
        const edad = req.params.edad;
        const perros = await PerroService.getPerrosPorEdad(edad);
        res.json(perros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPerrosOrdenadosPorNombre = async (req, res) => {
    try {
        const perros = await PerroService.getPerrosOrdenadosPorNombre();
        res.json(perros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
