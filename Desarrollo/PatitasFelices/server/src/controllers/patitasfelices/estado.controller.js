import { EstadoService } from '../../services/index.js';  // Ajuste de la ruta de importación

export const createEstado = async (req, res) => {
    try {
        const estado = await EstadoService.createEstado(req.body);
        res.status(201).json(estado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllEstados = async (req, res) => {
    try {
        const estados = await EstadoService.getAllEstados();
        res.json(estados);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getEstadoById = async (req, res) => {
    try {
        const estado = await EstadoService.getEstadoById(req.params.id);
        if (estado) {
            res.json(estado);
        } else {
            res.status(404).json({ message: 'Estado no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateEstado = async (req, res) => {
    try {
        const updatedEstado = await EstadoService.updateEstado(req.params.id, req.body);
        if (updatedEstado) {
            res.json(updatedEstado);
        } else {
            res.status(404).json({ message: 'Estado no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteEstado = async (req, res) => {
    try {
        const deleted = await EstadoService.deleteEstado(req.params.id);
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Estado no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};