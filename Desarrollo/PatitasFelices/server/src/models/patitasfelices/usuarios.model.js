import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/database.js';

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
  contrasena: {
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
  tableName: 'tb_usuario',
  timestamps: true,
});
