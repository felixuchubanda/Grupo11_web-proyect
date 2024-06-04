import { Perro } from '../../models/patitasfelices/perro.model.js';

// Crear un nuevo perro
export const createPerro = async (req, res) => {
    try {
        const newPerro = await Perro.create(req.body);
        res.status(201).json(newPerro);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todos los perros
export const getPerros = async (req, res) => {
    try {
        const perros = await Perro.findAll();
        res.status(200).json(perros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un perro por ID
export const getPerroById = async (req, res) => {
    try {
        const perro = await Perro.findByPk(req.params.id);
        if (perro) {
            res.status(200).json(perro);
        } else {
            res.status(404).json({ message: 'Perro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un perro
export const updatePerro = async (req, res) => {
    try {
        const perro = await Perro.findByPk(req.params.id);
        if (perro) {
            await perro.update(req.body);
            res.status(200).json(perro);
        } else {
            res.status(404).json({ message: 'Perro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un perro
export const deletePerro = async (req, res) => {
    try {
        const perro = await Perro.findByPk(req.params.id);
        if (perro) {
            await perro.destroy();
            res.status(204).json({ message: 'Perro eliminado' });
        } else {
            res.status(404).json({ message: 'Perro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
