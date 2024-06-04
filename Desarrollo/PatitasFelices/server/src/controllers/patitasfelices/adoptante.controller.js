import { Adoptante } from '../../models/patitasfelices/adoptante.model.js';
import { Usuario } from '../../models/patitasfelices/usuarios_model.js';
import { sequelize } from '../../database/database.js';

// Crear un nuevo adoptante y usuario
export const createAdoptante = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { nombre, apellido, cedula, genero, direccion, telefono, email, contraseña, edad, tiene_ninos, tiene_mascota, nivel_actividad, nivel_energia, tamaño_perro_preferido, experiencia_con_perros } = req.body;

        // Verificar si el correo electrónico ya existe
        const existingUser = await Usuario.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "El correo electrónico ya está en uso." });
        }

        // Crear el usuario
        const newUsuario = await Usuario.create({
            nombre,
            apellido,
            email,
            contraseña,
            nivel_acceso: "Usuario",
            tipo: "Adoptante"
        }, { transaction: t });

        // Crear el adoptante
        const newAdoptante = await Adoptante.create({
            id_usuario: newUsuario.id_usuario,
            cedula,
            genero,
            direccion,
            telefono,
            email,
            contraseña,
            edad,
            tiene_ninos,
            tiene_mascota,
            nivel_actividad,
            nivel_energia,
            tamaño_perro_preferido,
            experiencia_con_perros
        }, { transaction: t });

        // Commit de la transacción
        await t.commit();

        res.status(201).json({ usuario: newUsuario, adoptante: newAdoptante });
    } catch (error) {
        // Rollback de la transacción en caso de error
        await t.rollback();
        res.status(500).json({ message: error.message });
    }
};


// Obtener todos los adoptantes
export const getAdoptantes = async (req, res) => {
    try {
        const adoptantes = await Adoptante.findAll();
        res.status(200).json(adoptantes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un adoptante por ID
export const getAdoptanteById = async (req, res) => {
    try {
        const adoptante = await Adoptante.findByPk(req.params.id);
        if (adoptante) {
            res.status(200).json(adoptante);
        } else {
            res.status(404).json({ message: 'Adoptante no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un adoptante
export const updateAdoptante = async (req, res) => {
    try {
        const adoptante = await Adoptante.findByPk(req.params.id);
        if (adoptante) {
            await adoptante.update(req.body);
            res.status(200).json(adoptante);
        } else {
            res.status(404).json({ message: 'Adoptante no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un adoptante
export const deleteAdoptante = async (req, res) => {
    try {
        const adoptante = await Adoptante.findByPk(req.params.id);
        if (adoptante) {
            await adoptante.destroy();
            res.status(204).json({ message: 'Adoptante eliminado' });
        } else {
            res.status(404).json({ message: 'Adoptante no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};