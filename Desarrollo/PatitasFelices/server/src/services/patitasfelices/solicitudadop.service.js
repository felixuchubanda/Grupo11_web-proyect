import { SolicitudAdopcionRepository, AdoptanteRepository, PerroRepository } from '../../repositories/index.js';
import { Op } from 'sequelize';
import sendEmail from './email.service.js';
import { Adoptante } from '../../models/patitasfelices/adoptante.model.js';  // Verifica la ruta de tu archivo de modelo de Adoptante
import { Perro } from '../../models/patitasfelices/perro.model.js';         // Verifica la ruta de tu archivo de modelo de Perro
import dotenv from 'dotenv';

dotenv.config(); 
const SolicitudAdopcionService = {
    createSolicitudAdopcion: async (solicitudAdopcionData) => {
        const { id_adoptante, id_perro } = solicitudAdopcionData;

        solicitudAdopcionData.estado = 'pendiente';
        solicitudAdopcionData.fechaSolicitud = new Date();
        solicitudAdopcionData.rechazado_por_devolucion = false;

        const adoptanteValido = await AdoptanteRepository.getAdoptanteById(id_adoptante);
        const perroValido = await PerroRepository.getPerroById(id_perro);
        if (!adoptanteValido || !perroValido) {
            throw new Error('El adoptante o el perro no son válidos.');
        }

        const devoluciones = await SolicitudAdopcionRepository.getAllSolicitudesAdopcion({
            where: {
                id_adoptante,
                rechazado_por_devolucion: true
            }
        });

        if (devoluciones.count > 0) {
            throw new Error('El adoptante ha devuelto un perro anteriormente y no puede adoptar más.');
        }

        const solicitudesDuplicadas = await SolicitudAdopcionRepository.getAllSolicitudesAdopcion({
            where: {
                id_adoptante,
                id_perro,
                estado: 'pendiente'
            }
        });

        if (solicitudesDuplicadas.count > 0) {
            throw new Error('Ya existe una solicitud pendiente para este perro y adoptante.');
        }

        const solicitudesAprobadas = await SolicitudAdopcionRepository.getAllSolicitudesAdopcion({
            where: {
                id_adoptante,
                estado: 'aprobada'
            }
        });

        if (solicitudesAprobadas.count >= 2) {
            throw new Error('El adoptante ya tiene dos perros adoptados.');
        }

        const nuevaSolicitud = await SolicitudAdopcionRepository.createSolicitudAdopcion(solicitudAdopcionData);

        if (process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true') {
            const adoptante = await AdoptanteRepository.getAdoptanteById(id_adoptante);
            const perro = await PerroRepository.getPerroById(id_perro);

            const adminEmail = process.env.ADMIN_EMAIL;
            const subject = 'Nueva solicitud de adopción';
            const text = `Hola,\n\nSe ha creado una nueva solicitud de adopción para el perro ${perro.nombre} por el adoptante ${adoptante.nombre} ${adoptante.apellido}.\n\nSaludos,\nEquipo Patitas Felices`;

            await sendEmail(adminEmail, subject, text);
        }

        return nuevaSolicitud;
    },

    getAllSolicitudesAdopcion: async (pagination) => {
        const { limit, offset, filters } = pagination;
        const { rows, count } = await SolicitudAdopcionRepository.getAllSolicitudesAdopcion({
            where: filters,
            limit,
            offset
        });
    
        return { rows, count };
    },
    
    countAllSolicitudes: async (filters) => {
        return SolicitudAdopcionRepository.countAllSolicitudes(filters);
    },
    

    getSolicitudAdopcionById: async (idSolicitud) => {
        return SolicitudAdopcionRepository.getSolicitudAdopcionById(idSolicitud);
    },

    updateSolicitudAdopcion: async (idSolicitud, solicitudAdopcionData) => {
        const solicitudAdopcion = await SolicitudAdopcionRepository.getSolicitudAdopcionById(idSolicitud);
    
        if (!solicitudAdopcion) {
            throw new Error('Solicitud de adopción no encontrada.');
        }
    
        if (solicitudAdopcionData.estado && !['aprobada', 'rechazada'].includes(solicitudAdopcionData.estado)) {
            throw new Error('El estado de la solicitud no es válido. Debe ser "aprobada" o "rechazada".');
        }
    
        if (solicitudAdopcionData.rechazado_por_devolucion !== undefined) {
            if (solicitudAdopcionData.rechazado_por_devolucion) {
                solicitudAdopcionData.estado = 'rechazada';
                solicitudAdopcionData.fecha_devolucion = new Date(); // Establecer la fecha de devolución actual
                await PerroRepository.updatePerro(solicitudAdopcion.id_perro, { id_estado: 5 });
            } else if (!solicitudAdopcionData.rechazado_por_devolucion) {
                solicitudAdopcionData.estado = 'aprobada';
                await PerroRepository.updatePerro(solicitudAdopcion.id_perro, { id_estado: 2 });
                await SolicitudAdopcionService.updatePendingRequests(idSolicitud, solicitudAdopcion.id_perro, 'cancelada');
            }
        }
    
        if (solicitudAdopcionData.estado === 'aprobada') {
            await PerroRepository.updatePerro(solicitudAdopcion.id_perro, { id_estado: 2 });
            await SolicitudAdopcionService.updatePendingRequests(idSolicitud, solicitudAdopcion.id_perro, 'cancelada');
        } else if (solicitudAdopcionData.estado === 'rechazada' && solicitudAdopcionData.rechazado_por_devolucion === false) {
            solicitudAdopcionData.rechazado_por_devolucion = false;
            solicitudAdopcionData.fecha_devolucion = null; // Asegurarse de que fecha_devolucion sea nula si no es una devolución
            await PerroRepository.updatePerro(solicitudAdopcion.id_perro, { id_estado: 1 });
        }
    
        const updatedSolicitud = await SolicitudAdopcionRepository.updateSolicitudAdopcion(idSolicitud, solicitudAdopcionData);
    
        const adoptante = await AdoptanteRepository.getAdoptanteById(solicitudAdopcion.id_adoptante);
        const perro = await PerroRepository.getPerroById(solicitudAdopcion.id_perro);
    
        if (process.env.ENABLE_EMAIL_NOTIFICATIONS === 'true') {
            if (solicitudAdopcionData.estado === 'aprobada' || solicitudAdopcionData.estado === 'rechazada') {
                const estado = solicitudAdopcionData.estado === 'aprobada' ? 'aprobada' : 'rechazada';
                const subject = `Solicitud de adopción ${estado}`;
                const text = `Hola ${adoptante.nombre} ${adoptante.apellido},\n\nTu solicitud de adopción para el perro ${perro.nombre} ha sido ${estado}. Gracias por tu interés en adoptar uno de nuestros perros.\n\nSaludos,\nEquipo Patitas Felices`;
    
                await sendEmail(adoptante.email, subject, text);
            }
        }
    
        return updatedSolicitud;
    },    

    deleteSolicitudAdopcion: async (idSolicitud) => {
        return SolicitudAdopcionRepository.deleteSolicitudAdopcion(idSolicitud);
    },

    updatePendingRequests: async (idSolicitud, id_perro, newStatus) => {
        const solicitudesPendientes = await SolicitudAdopcionRepository.getAllSolicitudesAdopcion({
            where: {
                id_perro,
                estado: 'pendiente',
                idSolicitud: { [Op.ne]: idSolicitud }
            }
        });

        for (let solicitud of solicitudesPendientes.rows) {
            await SolicitudAdopcionRepository.updateSolicitudAdopcion(solicitud.idSolicitud, { estado: newStatus });
        }
    },
    
    getDevoluciones: async ({ page = 1 }) => {
        const limit = 10;
        const offset = (page - 1) * limit;
        const where = {
            rechazado_por_devolucion: true
        };
    
        const { rows, count } = await SolicitudAdopcionRepository.getAllSolicitudesAdopcion({
            where,
            include: [
                { model: Adoptante, attributes: ['nombre', 'apellido'] },
                { model: Perro, attributes: ['nombre'] }
            ],
            limit,
            offset
        });
    
        return {
            solicitudes: rows,
            totalPages: Math.ceil(count / limit)
        };
    },    

};

export default SolicitudAdopcionService;
