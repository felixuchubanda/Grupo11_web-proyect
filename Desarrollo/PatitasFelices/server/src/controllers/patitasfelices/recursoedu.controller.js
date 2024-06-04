import { Recursoedu } from '../../models/patitasfelices/recursoedu.model.js';

// Crear un nuevo recurso educativo
export const createRecursoedu = async (req, res) => {
    try {
        const newRecursoedu = await Recursoedu.create(req.body);
        res.status(201).json(newRecursoedu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todos los recursos educativos
export const getRecursosedu = async (req, res) => {
    try {
        const recursosedu = await Recursoedu.findAll();
        res.status(200).json(recursosedu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un recurso educativo por ID
export const getRecursoeduById = async (req, res) => {
    try {
        const recursoedu = await Recursoedu.findByPk(req.params.id);
        if (recursoedu) {
            res.status(200).json(recursoedu);
        } else {
            res.status(404).json({ message: 'Recurso educativo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un recurso educativo
export const updateRecursoedu = async (req, res) => {
    try {
        const recursoedu = await Recursoedu.findByPk(req.params.id);
        if (recursoedu) {
            await recursoedu.update(req.body);
            res.status(200).json(recursoedu);
        } else {
            res.status(404).json({ message: 'Recurso educativo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un recurso educativo
export const deleteRecursoedu = async (req, res) => {
    try {
        const recursoedu = await Recursoedu.findByPk(req.params.id);
        if (recursoedu) {
            await recursoedu.destroy();
            res.status(204).json({ message: 'Recurso educativo eliminado' });
        } else {
            res.status(404).json({ message: 'Recurso educativo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
