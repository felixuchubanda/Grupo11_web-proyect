import { PerroRepository, EstadoRepository } from '../../repositories/index.js';

const PerroService = {
    createPerro: async (perroData) => {
        const { nombre, edad, raza, tamano, genero, descripcion, nivel_energia, bueno_con_ninos, bueno_con_mascota, nivel_formacion, id_estado, imagen_url } = perroData;

        // Verificación de campos obligatorios
        if (!nombre || !edad || !raza || !tamano || !genero || !descripcion || !nivel_energia || !bueno_con_ninos || !bueno_con_mascota || !nivel_formacion || !imagen_url) {
            throw new Error('Todos los campos obligatorios deben estar completos.');
        }

        const nameRegex = /^[A-Za-z\s]+$/;
        if (!nameRegex.test(nombre) || nombre.length < 3) {
            throw new Error('El nombre solo debe contener letras y debe tener al menos 3 caracteres.');
        }

        // Verificación de edad
        if (edad < 1 || edad > 15) {
            throw new Error('La edad del perro debe estar entre 1 y 15 años.');
        }

        // Verificación del estado del perro
        const estadoValido = await EstadoRepository.getEstadoById(id_estado);
        if (!estadoValido) {
            throw new Error('El estado del perro no es válido.');
        }

        // Validación de tamaño basado en la raza
        if (raza === 'PEQUEÑO' && (tamano < 0 || tamano > 9.9)) {
            throw new Error('El tamaño para perros pequeños debe ser entre 0 y 9.9 kgs.');
        } else if (raza === 'MEDIANO' && (tamano < 0 || tamano > 18)) {
            throw new Error('El tamaño para perros medianos debe ser entre 0 y 18 kgs.');
        } else if (raza === 'GRANDE' && (tamano < 0 || tamano > 30)) {
            throw new Error('El tamaño para perros grandes debe ser entre 0 y 30 kgs.');
        } else if (raza === 'GIGANTE' && (tamano < 30 || tamano > 82)) {
            throw new Error('El tamaño para perros gigantes debe ser entre 30 y 82 kgs.');
        }

        return PerroRepository.createPerro(perroData);
    },

    getAllPerros: async (pagination) => {
        return PerroRepository.getAllPerros(pagination);
    },

    countAllPerros: async (filters) => {
        return PerroRepository.countAllPerros(filters);
    },

    getPerroById: async (id) => {
        return PerroRepository.getPerroById(id);
    },

    getPerrosPorTamano: async (tamano) => {
        return PerroRepository.getAllPerros({
            where: {
                tamano: tamano
            }
        });
    },

    getPerrosPorEstado: async (estado) => {
        return PerroRepository.getAllPerros({
            where: {
                id_estado: estado
            }
        });
    },

    updatePerro: async (id, perroData) => {
        const existingPerro = await PerroRepository.getPerroById(id);

        if (!existingPerro) {
            throw new Error('El perro no existe.');
        }

        const updatedPerroData = {
            ...existingPerro.dataValues,
            ...perroData
        };

        return PerroRepository.updatePerro(id, updatedPerroData);
    },

    getPerrosPorRaza: async (raza) => {
        return PerroRepository.getAllPerros({
            where: {
                raza: raza
            }
        });
    },

    getPerrosPorEdad: async (edad) => {
        return PerroRepository.getAllPerros({
            where: {
                edad: edad
            }
        });
    },

    getPerrosOrdenadosPorNombre: async () => {
        return PerroRepository.getAllPerros({
            order: [['nombre', 'ASC']]
        });
    },
    
    deletePerro: async (id) => {
        return PerroRepository.deletePerro(id);
    }
};

export default PerroService;
