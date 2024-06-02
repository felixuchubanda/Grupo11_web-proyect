import { DataTypes } from 'sequelize'
import { sequelize } from '../../database/database.js'



export const SolicitudAdopcion = sequelize.define('tb_solicitudadopcion', {
    idSolicitud: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    
    fechaSolicitud: {
      type: DataTypes.DATE,
    },
    comentario: {
      type: DataTypes.STRING(100),
    },
    descripcion: {
      type: DataTypes.STRING(100),
    },
    estado: {
      type: DataTypes.STRING(100),
    },
}, {
    schema:"patitasfelices",
    timestamps: true, // Enable timestamps for created_at and updated_at columns

  });