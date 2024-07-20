import { EstadoRepository } from '../../repositories/index.js';

const EstadoService = {
    createEstado: async (estadoData) => {
        return EstadoRepository.createEstado(estadoData);
    },

    getAllEstados: async () => {
        return EstadoRepository.getAllEstados();
    },

    getEstadoById: async (id) => {
        return EstadoRepository.getEstadoById(id);
    },

    updateEstado: async (id, estadoData) => {
        return EstadoRepository.updateEstado(id, estadoData);
    },

    deleteEstado: async (id) => {
        return EstadoRepository.deleteEstado(id);
    }
};

export default EstadoService;
