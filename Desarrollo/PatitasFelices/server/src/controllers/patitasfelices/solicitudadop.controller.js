import { SolicitudAdopcionService } from '../../services/index.js';

export const createSolicitudAdopcion = async (req, res) => {
    try {
        const solicitudAdopcion = await SolicitudAdopcionService.createSolicitudAdopcion(req.body);
        res.status(201).json(solicitudAdopcion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllSolicitudesAdopcion = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10; // Ajusta el límite de elementos por página si es necesario
        const offset = (page - 1) * limit;

        const filters = {};

        if (req.query.estado) filters.estado = req.query.estado;

        const { rows, count } = await SolicitudAdopcionService.getAllSolicitudesAdopcion({ limit, offset, filters });
        const totalSolicitudes = await SolicitudAdopcionService.countAllSolicitudes(filters);

        res.json({
            solicitudes: rows,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getSolicitudAdopcionById = async (req, res) => {
    try {
        const solicitudAdopcion = await SolicitudAdopcionService.getSolicitudAdopcionById(req.params.id);
        if (solicitudAdopcion) {
            res.json(solicitudAdopcion);
        } else {
            res.status(404).json({ message: 'Solicitud de adopción no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateSolicitudAdopcion = async (req, res) => {
    try {
        const updatedSolicitudAdopcion = await SolicitudAdopcionService.updateSolicitudAdopcion(req.params.id, req.body);
        if (updatedSolicitudAdopcion) {
            res.json(updatedSolicitudAdopcion);
        } else {
            res.status(404).json({ message: 'Solicitud de adopción no encontrada' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteSolicitudAdopcion = async (req, res) => {
    try {
        const deleted = await SolicitudAdopcionService.deleteSolicitudAdopcion(req.params.id);
        if (deleted) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: 'Solicitud de adopción no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getDevoluciones = async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const devoluciones = await SolicitudAdopcionService.getDevoluciones({ page });
        res.json(devoluciones);
    } catch (error) {
        console.error('Error fetching devoluciones:', error); // Agrega este log
        res.status(500).json({ message: error.message });
    }
};