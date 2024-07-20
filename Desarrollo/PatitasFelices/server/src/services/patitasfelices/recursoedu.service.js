import { RecursoeduRepository, UsuarioRepository } from '../../repositories/index.js';

const RecursoeduService = {
    createRecursoedu: async (recursoeduData, userId) => {
        const usuario = await UsuarioRepository.getUsuarioById(userId);

        // Verificación de nivel de acceso adecuado
        if (!['administrador', 'empleado'].includes(usuario.nivel_acceso)) {
            throw new Error('Solo usuarios con el nivel de acceso adecuado (administradores, empleados) pueden publicar recursos educativos.');
        }

        // Verificación de tipo
        const tiposValidos = ['guía', 'artículo', 'video'];
        if (!tiposValidos.includes(recursoeduData.tipo)) {
            throw new Error('Los recursos educativos deben estar categorizados como guía, artículo o video.');
        }

        return RecursoeduRepository.createRecursoedu(recursoeduData);
    },

    getAllRecursosedu: async () => {
        return RecursoeduRepository.getAllRecursoedu();
    },

    getRecursoeduById: async (id) => {
        return RecursoeduRepository.getRecursoeduById(id);
    },

    updateRecursoedu: async (id, recursoeduData, userId) => {
        const usuario = await UsuarioRepository.getUsuarioById(userId);

        // Verificación de nivel de acceso adecuado
        if (!['administrador', 'empleado'].includes(usuario.nivel_acceso)) {
            throw new Error('Solo usuarios con el nivel de acceso adecuado (administradores, empleados) pueden actualizar recursos educativos.');
        }

        // Verificación de tipo
        const tiposValidos = ['guía', 'artículo', 'video'];
        if (recursoeduData.tipo && !tiposValidos.includes(recursoeduData.tipo)) {
            throw new Error('Los recursos educativos deben estar categorizados como guía, artículo o video.');
        }

        return RecursoeduRepository.updateRecursoedu(id, recursoeduData);
    },

    deleteRecursoedu: async (id) => {
        return RecursoeduRepository.deleteRecursoedu(id);
    }
};

export default RecursoeduService;
