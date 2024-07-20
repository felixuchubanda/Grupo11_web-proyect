import { Adoptante } from '../../models/index.js';
import { Op } from 'sequelize';

const AdoptanteRepository = {
    createAdoptante: async (adoptanteData, transaction) => {
        return Adoptante.create(adoptanteData, { transaction });
    },

    getAllAdoptantes: async (pagination) => {
        const { limit, offset, filters } = pagination;
        return Adoptante.findAll({
            where: filters,
            limit,
            offset,
            order: [['updatedAt', 'DESC']]
        });
    },

    countAllAdoptantes: async (filters) => {
        return Adoptante.count({ where: filters });
    },

    getAdoptanteById: async (id) => {
        return Adoptante.findByPk(id);
    },

    updateAdoptante: async (id, adoptanteData) => {
        const adoptante = await Adoptante.findByPk(id);
        if (adoptante) {
            return adoptante.update(adoptanteData);
        }
        return null;
    },

    deleteAdoptante: async (id) => {
        const adoptante = await Adoptante.findByPk(id);
        if (adoptante) {
            await adoptante.destroy();
            return true;
        }
        return false;
    },

    getAdoptanteByCedulaOEmail: async (cedula, email) => {
        return Adoptante.findAll({
            where: {
                [Op.or]: [
                    { cedula },
                    { email }
                ]
            }
        });
    }
};

export default AdoptanteRepository;
