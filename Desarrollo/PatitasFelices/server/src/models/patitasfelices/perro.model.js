
import { DataTypes, ForeignKeyConstraintError } from 'sequelize'
import { sequelize } from '../../database/database.js'
import { SolicitudAdopcion } from './solicitudadop.modelo.js';




export const Perro = sequelize.define('tb_perro', {
    id_perro: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1,
      },
    },
    raza: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    tamaño: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    genero: {
      type: DataTypes.ENUM('Macho', 'Hembra'),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    bueno_con_ninos: {
      type: DataTypes.ENUM('Si', 'No'),
      allowNull: false,
    },
    bueno_con_mascota: {
      type: DataTypes.ENUM('Si', 'No'),
      allowNull: false,
    },
    nivel_formacion: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    schema:"patitasfelices",
    timestamps: true, // Enable timestamps for created_at and updated_at columns
  });


  Perro.hasMany(SolicitudAdopcion,{
    foreignKey: 'id_perro',
    sourceKey:'id_perro',
  });

  SolicitudAdopcion.belongsTo(Perro,{
    foreignKey:'id_perro',
    targetKey:'id_perro',
  });

// de uno a muchos a solicitud

Perro.hasMany(SolicitudAdopcion,{
   foreignKey:'id_perro',
   sourceKey: 'id_perro',
});

SolicitudAdopcion.belongsTo(Perro,{
  foreignKey: 'id_perro',
  targetKey:'id_perro',
});