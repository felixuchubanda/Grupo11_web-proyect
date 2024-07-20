import { Perro } from '../../models/index.js';

const PerroRepository = {
    createPerro: async (perroData, transaction) => {
        return Perro.create(perroData, { transaction });
    },

    getAllPerros: async (pagination) => {
        const { limit, offset, filters } = pagination;
        return Perro.findAll({
            where: filters,
            limit,
            offset,
            order: [['updatedAt', 'DESC']] // Ordenar por fecha de creación para mostrar el más reciente primero
        });
    },

    countAllPerros: async (filters) => {
        return Perro.count({ where: filters });
    },

    getPerroById: async (id) => {
        return Perro.findByPk(id);
    },

    updatePerro: async (id, perroData) => {
        const perro = await Perro.findByPk(id);
        if (perro) {
            return perro.update(perroData);
        }
        return null;
    },

    deletePerro: async (id) => {
        const perro = await Perro.findByPk(id);
        if (perro) {
            await perro.destroy();
            return true;
        }
        return false;
    }
};

export default PerroRepository;
