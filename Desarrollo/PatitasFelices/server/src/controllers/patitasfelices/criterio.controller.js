import { Criterio } from '../../models/patitasfelices/criterio.model.js';

// Crear un nuevo criterio
export const createCriterio = async (req, res) => {
    try {
        const newCriterio = await Criterio.create(req.body);
        res.status(201).json(newCriterio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todos los criterios
export const getCriterios = async (req, res) => {
    try {
        const criterios = await Criterio.findAll();
        res.status(200).json(criterios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un criterio por ID
export const getCriterioById = async (req, res) => {
    try {
        const criterio = await Criterio.findByPk(req.params.id);
        if (criterio) {
            res.status(200).json(criterio);
        } else {
            res.status(404).json({ message: 'Criterio no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un criterio
export const updateCriterio = async (req, res) => {
    try {
        const criterio = await Criterio.findByPk(req.params.id);
        if (criterio) {
            await criterio.update(req.body);
            res.status(200).json(criterio);
        } else {
            res.status(404).json({ message: 'Criterio no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un criterio
export const deleteCriterio = async (req, res) => {
    try {
        const criterio = await Criterio.findByPk(req.params.id);
        if (criterio) {
            await criterio.destroy();
            res.status(204).json({ message: 'Criterio eliminado' });
        } else {
            res.status(404).json({ message: 'Criterio no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
