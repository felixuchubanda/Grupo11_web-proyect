import recommendationService from '../../services/patitasfelices/recommendation.service.js';

export const getRecommendations = async (req, res) => {
    const { id_adoptante, numRecommendations } = req.body;
    
    console.log('Request body:', req.body);
    
    try {
        const recommendations = await recommendationService.getForAdoptante(id_adoptante, numRecommendations);
        res.json(recommendations);
    } catch (error) {
        console.error('Error in getRecommendations:', error.message);
        res.status(500).json({ error: `Error fetching recommendations: ${error.message}` });
    }
};

export const getVisitorRecommendations = async (req, res) => {
    const { preferences, numRecommendations } = req.body; // Obtener las preferencias directamente del cuerpo de la solicitud
    
    console.log('Request body:', req.body);
    
    try {
        const recommendations = await recommendationService.getForVisitor(preferences, numRecommendations);
        res.json(recommendations);
    } catch (error) {
        console.error('Error in getVisitorRecommendations:', error.message);
        res.status(500).json({ error: `Error fetching recommendations for visitor: ${error.message}` });
    }
};


export const getAdoptanteByUsuarioId = async (req, res) => {
    const { id_usuario } = req.params;

    try {
        const adoptante = await recommendationService.getAdoptanteByUsuarioId(id_usuario);
        res.json(adoptante);
    } catch (error) {
        console.error('Error in getAdoptanteByUsuarioId:', error.message);
        res.status(500).json({ error: `Error fetching adoptante: ${error.message}` });
    }
};
export const updateAdoptantePreferences = async (req, res) => {
    const { id_adoptante } = req.params;
    const preferences = req.body;

    try {
        await recommendationService.updateAdoptantePreferences(id_adoptante, preferences);
        res.json({ message: 'Preferences subidas exitosamente' });
    } catch (error) {
        console.error('Error in updateAdoptantePreferences:', error.message);
        res.status(500).json({ error: `Error updating preferences: ${error.message}` });
    }
};

export const createAdoptionRequest = async (req, res) => {
    const adoptionData = req.body;

    try {
        await recommendationService.createAdoptionRequest(adoptionData);
        res.json({ message: 'Adoption request created successfully' });
    } catch (error) {
        console.error('Error in createAdoptionRequest:', error.message);
        res.status(500).json({ error: error.message });
    }
};