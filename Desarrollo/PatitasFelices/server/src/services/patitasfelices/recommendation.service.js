import axios from 'axios';
import { Perro } from '../../models/patitasfelices/perro.model.js';
import { Adoptante } from '../../models/patitasfelices/adoptante.model.js';
import { SolicitudAdopcion } from '../../models/patitasfelices/solicitudadop.model.js';
import { Op } from 'sequelize';

const getForAdoptante = async (adoptanteId, numRecommendations = 5) => {
    try {
        const adoptante = await getAdoptante(adoptanteId);
        const perros = await getPerros();
        const preferences = generatePreferences(adoptante);
        console.log('Sending request to Flask with preferences and perros:', preferences, perros); // Agregar detalles para la depuración
        const response = await axios.post('http://localhost:5000/recommend', {
            preferences,
            perros,
            numRecommendations
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching recommendations:', error.message);
        throw new Error(`Error fetching recommendations: ${error.message}`);
    }
};

const getForVisitor = async (preferences, numRecommendations = 5) => {
    try {
        const perros = await getPerros();
        console.log('Sending request to Flask with preferences and perros:', preferences, perros); // Agregar detalles para la depuración
        const response = await axios.post('http://localhost:5000/recommend', {
            preferences: JSON.stringify(preferences),  // Asegúrate de enviar las preferencias como un string
            perros,
            numRecommendations
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching recommendations for visitor:', error.message);
        throw new Error(`Error fetching recommendations for visitor: ${error.message}`);
    }
};

const getAdoptante = async (adoptanteId) => {
    try {
        const adoptante = await Adoptante.findByPk(adoptanteId);
        if (!adoptante) throw new Error(`Adoptante with id ${adoptanteId} not found`);
        return adoptante.toJSON();
    } catch (error) {
        console.error('Error fetching adoptante:', error.message);
        throw new Error(`Error fetching adoptante: ${error.message}`);
    }
};

const getPerros = async () => {
    try {
        const perros = await Perro.findAll({
            where: {
                id_estado: [1, 5]
            },
            attributes: ['id_perro', 'nombre', 'edad', 'raza', 'tamano', 'genero', 'descripcion', 'imagen_url']
        });
        return perros.map(perro => perro.toJSON());
    } catch (error) {
        console.error('Error fetching perros:', error.message);
        throw new Error(`Error fetching perros: ${error.message}`);
    }
};

const generatePreferences = (adoptante) => {
    return `
        tiene_ninos: ${adoptante.tiene_ninos}
        tiene_mascota: ${adoptante.tiene_mascota}
        nivel_actividad: ${adoptante.nivel_actividad}
        nivel_energia: ${adoptante.nivel_energia}
        tamano_perro_preferido: ${adoptante.tamano_perro_preferido}
        experiencia_con_perros: ${adoptante.experiencia_con_perros}
    `;
};

const getAdoptanteByUsuarioId = async (usuarioId) => {
    try {
        const adoptante = await Adoptante.findOne({ where: { id_usuario: usuarioId } });
        if (!adoptante) throw new Error(`Adoptante with user id ${usuarioId} not found`);
        return adoptante.toJSON();
    } catch (error) {
        console.error('Error fetching adoptante by user id:', error.message);
        throw new Error(`Error fetching adoptante: ${error.message}`);
    }
};
const updateAdoptantePreferences = async (id_adoptante, preferences) => {
    try {
        await Adoptante.update(preferences, { where: { id_adoptante } });
    } catch (error) {
        console.error('Error updating adoptante preferences:', error.message);
        throw new Error(`Error updating preferences: ${error.message}`);
    }
};

const createAdoptionRequest = async (adoptionData) => {
    const { id_adoptante, id_perro } = adoptionData;

    // Verificar si el adoptante tiene solicitudes rechazadas por devolución
    const hasRejectedReturn = await SolicitudAdopcion.findOne({
        where: {
            id_adoptante,
            rechazado_por_devolucion: true
        }
    });

    if (hasRejectedReturn) {
        throw new Error('No puede adoptar porque ha devuelto un perro anteriormente.');
    }

    // Verificar si ya existe una solicitud pendiente para el mismo adoptante o perro
    const hasPendingRequest = await SolicitudAdopcion.findOne({
        where: {
            [Op.or]: [
                { id_adoptante, estado: 'pendiente' },
                { id_perro, estado: 'pendiente' }
            ]
        }
    });

    if (hasPendingRequest) {
        throw new Error('Ya tiene una solicitud pendiente para este perro o ya existe una solicitud pendiente para este adoptante.');
    }

    // Crear la solicitud de adopción
    try {
        await SolicitudAdopcion.create(adoptionData);
    } catch (error) {
        console.error('Error creating adoption request:', error.message);
        throw new Error(`Error creating adoption request: ${error.message}`);
    }
};

export default {
    getForAdoptante,
    getForVisitor,
    getAdoptanteByUsuarioId,
    updateAdoptantePreferences,
    createAdoptionRequest
};
