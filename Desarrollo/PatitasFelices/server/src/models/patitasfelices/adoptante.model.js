// src/models/adoptante.model.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/database.js';
import { Usuario } from './usuarios.model.js'; // Importa el modelo de Usuario

export const Adoptante = sequelize.define('tb_adoptante', {
  id_adoptante: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_usuario: {
    type: DataTypes.INTEGER,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      isAlpha: true, 
      notEmpty: true,
      len: [3, 100]
    },
  },
  apellido: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      isAlpha: true, 
      notEmpty: true,
      len: [3, 100]
    },
  },
  cedula: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  genero: {
    type: DataTypes.ENUM('M', 'F'),
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  contrasena: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 18,
      max: 70, 
    },
  },
  tiene_ninos: {
    type: DataTypes.ENUM('SI', 'NO'),
    allowNull: false,
  },
  tiene_mascota: {
    type: DataTypes.ENUM('SI', 'NO'),
    allowNull: false,
  },
  nivel_actividad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 1,
      max: 5,
    },
  },
  nivel_energia: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 1,
      max: 5,
    },
  },
  tamano_perro_preferido: {
    type: DataTypes.ENUM('PEQUEÑO', 'MEDIANO', 'GRANDE'),
    allowNull: false,
  },
  experiencia_con_perros: {
    type: DataTypes.ENUM('PRINCIPIANTE', 'INTERMEDIO', 'EXPERTO'),
    allowNull: false,
  },
}, {
  schema: "patitasfelices",
  tableName: 'tb_adoptante',
  timestamps: true,
  hooks: {
    afterDestroy: async (adoptante, options) => {
      const usuario = await Usuario.findByPk(adoptante.id_usuario);
      if (usuario) {
        await usuario.destroy(options);
      }
    }
  }
});
