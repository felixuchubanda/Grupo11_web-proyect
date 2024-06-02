import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/database.js';
import { Test } from './test.modelo.js';
import { Usuario } from './usuarios_model.js';
import { SolicitudAdopcion } from './solicitudadop.modelo.js';
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
  },
  apellido: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  cedula: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  genero: {
    type: DataTypes.ENUM('M', 'F'), // Assuming 'M' for Male and 'F' for Female
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
  contraseña: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 18,
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
  tamaño_perro_preferido: {
    type: DataTypes.ENUM('PEQUEÑO', 'MEDIANO', 'GRANDE'),
    allowNull: false,
  },
  experiencia_con_perros: {
    type: DataTypes.ENUM('PRINCIPIANTE', 'INTERMEDIO', 'EXPERTO'),
    allowNull: false,
  },
}, {
  schema: "patitasfelices",
  timestamps: true, // Enable timestamps for created_at and updated_at columns
});
//de uno a muchos
Adoptante.hasMany(Test,{
foreignKey:'id_adoptante',
sourceKey:'id_adoptante',
});

Test.belongsTo(Adoptante,{
  foreignKey:'id_adoptante',
  targetKey: 'id_adoptante',
});


//de uno a muchos adoptante a solicitud
Adoptante.hasMany(SolicitudAdopcion,{
  foreignKey: 'id_adoptante',
  sourceKey: 'id_adoptante',
});

SolicitudAdopcion.belongsTo(Adoptante,{
  foreignKey: 'id_adoptante',
  targetKey: 'id_adoptante',
});


