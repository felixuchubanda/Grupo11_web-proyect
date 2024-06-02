// src/models/patitasfelices/usuario.model.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/database.js';
import { Recursoedu } from './recursoedu.model.js';
import { Adoptante } from './adoptante.model.js'; // Importamos el modelo de Adoptante

export const Usuario = sequelize.define('tb_usuario', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  apellido: {
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
  contraseña: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  nivel_acceso: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  schema: "patitasfelices",
  timestamps: true,
});

// Definición de la asociación
Usuario.hasMany(Recursoedu, {
  foreignKey: 'id_usuario',
  sourceKey: 'id_usuario',  // Aquí debería ser 'id_usuario' en lugar de 'id'
});

Recursoedu.belongsTo(Usuario, {
  foreignKey: 'id_usuario',
  targetKey: 'id_usuario',  // Aquí debería ser 'id_usuario' en lugar de 'id'
});



// Definición de la asociación uno a uno con Adoptante
Usuario.hasOne(Adoptante, {
  foreignKey: 'id_usuario', // Clave externa en la tabla Adoptante
  targetKey: 'id_usuario', 
});

Usuario.belongsTo(Adoptante, {
  foreignKey: 'id_usuario', // Clave externa en la tabla Adoptante
  targetKey: 'id_usuario',
});