import { DataTypes } from 'sequelize'
import { sequelize } from '../../database/database.js'
import { Perro } from './perro.model.js';


export const Estado = sequelize.define('tb_Estado', {
    id_estado: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    adoptado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    disponible: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    fallecido: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    enfermo: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    devuelto: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  
}, {
    schema:"patitasfelices",
    timestamps: true, // Enable timestamps for created_at and updated_at columns
  });

  Estado.hasMany(Perro,{
    foreignKey: 'id_estado',
    sourceKey: 'id_estado',
  });

  Perro.belongsTo(Estado,{
    foreignKey:'id_estado',
    targetKey: 'id_estado',
  });


  
