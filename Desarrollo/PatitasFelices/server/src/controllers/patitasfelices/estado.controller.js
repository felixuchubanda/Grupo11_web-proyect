import { Estado } from '../../models/patitasfelices/estado.model.js';

// Crear un nuevo estado
export const createEstado = async (req, res) => {
    try {
        const newEstado = await Estado.create(req.body);
        res.status(201).json(newEstado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todos los estados
export const getEstados = async (req, res) => {
    try {
        const estados = await Estado.findAll();
        res.status(200).json(estados);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un estado por ID
export const getEstadoById = async (req, res) => {
    try {
        const estado = await Estado.findByPk(req.params.id);
        if (estado) {
            res.status(200).json(estado);
        } else {
            res.status(404).json({ message: 'Estado no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un estado
export const updateEstado = async (req, res) => {
    try {
        const estado = await Estado.findByPk(req.params.id);
        if (estado) {
            await estado.update(req.body);
            res.status(200).json(estado);
        } else {
            res.status(404).json({ message: 'Estado no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un estado
export const deleteEstado = async (req, res) => {
    try {
        const estado = await Estado.findByPk(req.params.id);
        if (estado) {
            await estado.destroy();
            res.status(204).json({ message: 'Estado eliminado' });
        } else {
            res.status(404).json({ message: 'Estado no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
