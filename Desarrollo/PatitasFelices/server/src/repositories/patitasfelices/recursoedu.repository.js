import { Recursoedu } from '../../models/index.js';

const RecursoeduRepository = {
    createRecursoedu: async (recursoeduData, transaction) => {
        return Recursoedu.create(recursoeduData, { transaction });
    },

    getAllRecursoedu: async () => {
        return Recursoedu.findAll();
    },

    getRecursoeduById: async (id) => {
        return Recursoedu.findByPk(id);
    },

    updateRecursoedu: async (id, recursoeduData) => {
        const recursoedu = await Recursoedu.findByPk(id);
        if (recursoedu) {
            return recursoedu.update(recursoeduData);
        }
        return null;
    },

    deleteRecursoedu: async (id) => {
        const recursoedu = await Recursoedu.findByPk(id);
        if (recursoedu) {
            await recursoedu.destroy();
            return true;
        }
        return false;
    }
};

export default RecursoeduRepository;