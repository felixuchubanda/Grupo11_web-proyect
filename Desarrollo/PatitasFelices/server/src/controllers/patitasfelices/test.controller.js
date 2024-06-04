import { Test } from '../../models/patitasfelices/test.modelo.js';

// Crear un nuevo test
export const createTest = async (req, res) => {
    try {
        const newTest = await Test.create(req.body);
        res.status(201).json(newTest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todos los tests
export const getTests = async (req, res) => {
    try {
        const tests = await Test.findAll();
        res.status(200).json(tests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un test por ID
export const getTestById = async (req, res) => {
    try {
        const test = await Test.findByPk(req.params.id);
        if (test) {
            res.status(200).json(test);
        } else {
            res.status(404).json({ message: 'Test no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un test
export const updateTest = async (req, res) => {
    try {
        const test = await Test.findByPk(req.params.id);
        if (test) {
            await test.update(req.body);
            res.status(200).json(test);
        } else {
            res.status(404).json({ message: 'Test no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un test
export const deleteTest = async (req, res) => {
    try {
        const test = await Test.findByPk(req.params.id);
        if (test) {
            await test.destroy();
            res.status(204).json({ message: 'Test eliminado' });
        } else {
            res.status(404).json({ message: 'Test no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
