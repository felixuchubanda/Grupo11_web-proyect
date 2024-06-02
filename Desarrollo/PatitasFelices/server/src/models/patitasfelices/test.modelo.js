import { DataTypes } from 'sequelize'
import { sequelize } from '../../database/database.js'


export const Test = sequelize.define('tb_Test', {
    idTest: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    
    puntaje: {
      type: DataTypes.INTEGER,
    },
    fechaTest: {
      type: DataTypes.DATE,
    },
    interaccionTipo: {
      type: DataTypes.STRING(100),
    },
}, {
    schema:"patitasfelices",
    timestamps: true, // Enable timestamps for created_at and updated_at columns
  });
  