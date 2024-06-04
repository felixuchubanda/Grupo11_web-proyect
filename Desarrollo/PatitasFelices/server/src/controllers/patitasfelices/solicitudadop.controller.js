import { SolicitudAdopcion } from '../../models/patitasfelices/solicitudadop.modelo.js';

// Crear una nueva solicitud de adopción
export const createSolicitudAdopcion = async (req, res) => {
    try {
        const newSolicitudAdopcion = await SolicitudAdopcion.create(req.body);
        res.status(201).json(newSolicitudAdopcion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todas las solicitudes de adopción
export const getSolicitudesAdopcion = async (req, res) => {
    try {
        const solicitudesAdopcion = await SolicitudAdopcion.findAll();
        res.status(200).json(solicitudesAdopcion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una solicitud de adopción por ID
export const getSolicitudAdopcionById = async (req, res) => {
    try {
        const solicitudAdopcion = await SolicitudAdopcion.findByPk(req.params.id);
        if (solicitudAdopcion) {
            res.status(200).json(solicitudAdopcion);
        } else {
            res.status(404).json({ message: 'Solicitud de adopción no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una solicitud de adopción
export const updateSolicitudAdopcion = async (req, res) => {
    try {
        const solicitudAdopcion = await SolicitudAdopcion.findByPk(req.params.id);
        if (solicitudAdopcion) {
            await solicitudAdopcion.update(req.body);
            res.status(200).json(solicitudAdopcion);
        } else {
            res.status(404).json({ message: 'Solicitud de adopción no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una solicitud de adopción
export const deleteSolicitudAdopcion = async (req, res) => {
    try {
        const solicitudAdopcion = await SolicitudAdopcion.findByPk(req.params.id);
        if (solicitudAdopcion) {
            await solicitudAdopcion.destroy();
            res.status(204).json({ message: 'Solicitud de adopción eliminada' });
        } else {
            res.status(404).json({ message: 'Solicitud de adopción no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
