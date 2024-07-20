import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/database.js';

export const Recursoedu = sequelize.define('tb_recursoedu', {
  id_recurso: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  fecha_publicacion: {
    type: DataTypes.DATE,
  },
  tipo: {
    type: DataTypes.STRING,
  },
}, {
  schema: "patitasfelices",
  tableName: 'tb_recursoedu',
  timestamps: true,
});
