import { SolicitudAdopcion, Adoptante, Perro } from '../../models/index.js';

const SolicitudAdopcionRepository = {
    createSolicitudAdopcion: async (solicitudAdopcionData, transaction) => {
        return SolicitudAdopcion.create(solicitudAdopcionData, { transaction });
    },

    getAllSolicitudesAdopcion: async ({ where = {}, limit, offset }) => {
        const { rows, count } = await SolicitudAdopcion.findAndCountAll({
            where,
            include: [
                { model: Adoptante, attributes: ['nombre', 'apellido'] },
                { model: Perro, attributes: ['nombre'] }
            ],
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        });
    
        return { rows, count };
    },
    
    countAllSolicitudes: async (filters) => {
        return SolicitudAdopcion.count({ where: filters });
    },    

    getSolicitudAdopcionById: async (id) => {
        return SolicitudAdopcion.findByPk(id, {
            include: [
                { model: Adoptante, attributes: ['nombre', 'apellido'] },
                { model: Perro, attributes: ['nombre'] }
            ]
        });
    },

    updateSolicitudAdopcion: async (id, solicitudAdopcionData) => {
        const solicitudAdopcion = await SolicitudAdopcion.findByPk(id);
        if (solicitudAdopcion) {
            return solicitudAdopcion.update(solicitudAdopcionData);
        }
        return null;
    },

    deleteSolicitudAdopcion: async (id) => {
        const solicitudAdopcion = await SolicitudAdopcion.findByPk(id);
        if (solicitudAdopcion) {
            await solicitudAdopcion.destroy();
            return true;
        }
        return false;
    },
    
    getDevoluciones: async ({ limit, offset }) => {
        const { rows, count } = await SolicitudAdopcion.findAndCountAll({
            where: {
                rechazado_por_devolucion: true
            },
            include: [
                { model: Adoptante, attributes: ['nombre', 'apellido'] },
                { model: Perro, attributes: ['nombre'] }
            ],
            limit,
            offset,
            order: [['fecha_devolucion', 'DESC']]
        });

        return { rows, count };
    }
};

export default SolicitudAdopcionRepository;
