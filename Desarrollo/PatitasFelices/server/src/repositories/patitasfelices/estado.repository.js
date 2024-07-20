import { Estado } from '../../models/index.js';

const EstadoRepository = {
    createEstado: async (estadoData, transaction) => {
        return Estado.create(estadoData, { transaction });
    },

    getAllEstados: async () => {
        return Estado.findAll();
    },

    getEstadoById: async (id) => {
        return Estado.findByPk(id);
    },

    updateEstado: async (id, estadoData) => {
        const estado = await Estado.findByPk(id);
        if (estado) {
            return estado.update(estadoData);
        }
        return null;
    },

    deleteEstado: async (id) => {
        const estado = await Estado.findByPk(id);
        if (estado) {
            await estado.destroy();
            return true;
        }
        return false;
    },
    getEstadoByNombre: async (nombre) => {
        return Estado.findOne({
            where: {
                estado: nombre
            }
        });
    }
};

export default EstadoRepository;