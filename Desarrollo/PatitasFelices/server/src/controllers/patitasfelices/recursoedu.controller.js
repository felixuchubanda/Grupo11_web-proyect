import { RecursoeduService } from '../../services/index.js';

export const createRecursoedu = async (req, res) => {
    try {
        const recursoedu = await RecursoeduService.createRecursoedu(req.body, req.user.id);
        res.status(201).json(recursoedu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllRecursosedu = async (req, res) => {
    try {
        const recursosedu = await RecursoeduService.getAllRecursosedu();
        res.json(recursosedu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRecursoeduById = async (req, res) => {
    try {
        const recursoedu = await RecursoeduService.getRecursoeduById(req.params.id);
        if (recursoedu) {
            res.json(recursoedu);
        } else {
            res.status(404).json({ message: 'Recurso educativo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateRecursoedu = async (req, res) => {
    try {
        const updatedRecursoedu = await RecursoeduService.updateRecursoedu(req.params.id, req.body, req.user.id);
        if (updatedRecursoedu) {
            res.json(updatedRecursoedu);
        } else {
            res.status(404).json({ message: 'Recurso educativo no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteRecursoedu = async (req, res) => {
    try {
        const deleted = await RecursoeduService.deleteRecursoedu(req.params.id);
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Recurso educativo no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};