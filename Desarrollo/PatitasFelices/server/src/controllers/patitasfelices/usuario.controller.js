import { Usuario } from '../../models/patitasfelices/usuarios_model.js';
import { Adoptante } from '../../models/patitasfelices/adoptante.model.js';
import { sequelize } from '../../database/database.js';

// Crear un nuevo usuario
//esta funcion va traer todos los atributos para crear usuario
export const createUsuario = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const newUsuario = await Usuario.create(req.body);
        //res.status(201).json(newUsuario);
        //
        if (req.body.tipo === 'Adoptante') {
            await Adoptante.create({
                id_usuario: newUsuario.id_usuario,
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                // Puedes asignar otros campos necesarios para el Adoptante
                cedula: req.body.cedula,
                genero: req.body.genero,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                email: req.body.email,
                contraseña: req.body.contraseña,
                edad: req.body.edad,
                tiene_ninos: req.body.tiene_ninos,
                tiene_mascota: req.body.tiene_mascota,
                nivel_actividad: req.body.nivel_actividad,
                nivel_energia: req.body.nivel_energia,
                tamaño_perro_preferido: req.body.tamaño_perro_preferido,
                experiencia_con_perros: req.body.experiencia_con_perros
            }, { transaction: t });
        }

        await t.commit();

        res.status(201).json(newUsuario);
    } catch (error) {
        await t.rollback();
        res.status(500).json({ message: error.message });
    }
};

// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un usuario por ID
export const getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un usuario
export const updateUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (usuario) {
            await usuario.update(req.body);
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un usuario
export const deleteUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (usuario) {
            await usuario.destroy();
            res.status(204).json({ message: 'Usuario eliminado' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
