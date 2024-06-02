import { DataTypes } from 'sequelize'
import { sequelize } from '../../database/database.js'



export const Criterio = sequelize.define('tb_criterio', {
    id_criterio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    peso: {
      type: DataTypes.FLOAT,
      allowNull: false
    },

}, {
    schema:"patitasfelices",
    timestamps: true, // Enable timestamps for created_at and updated_at columns
  });