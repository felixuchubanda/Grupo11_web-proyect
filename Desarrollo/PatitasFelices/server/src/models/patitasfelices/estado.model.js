import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/database.js';

export const Estado = sequelize.define('tb_estado', {
  id_estado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  estado: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
}, {
  schema: "patitasfelices",
  tableName: 'tb_estado',
  timestamps: true,
});
