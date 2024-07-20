import { DataTypes } from 'sequelize';
import { sequelize } from '../../database/database.js';

export const Perro = sequelize.define('tb_perro', {
  id_perro: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      isAlpha: true, 
      notEmpty: true,
      len: [3, 100] 
    },
  },
  imagen_url: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 1,
      max: 15, 
    },
  },
  raza: {
    type: DataTypes.ENUM('PEQUEÑO', 'MEDIANO', 'GRANDE', 'GIGANTE'),
    allowNull: false,
  },
  tamano: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    validate: {
      isFloat: true,
      customValidator(value) {
        if (this.raza === 'PEQUEÑO' && (value < 0 || value > 9.9)) {
          throw new Error('El tamaño para perros pequeños debe ser entre 0 y 9.9 kgs.');
        } else if (this.raza === 'MEDIANO' && (value < 0 || value > 18)) {
          throw new Error('El tamaño para perros medianos debe ser entre 0 y 18 kgs.');
        } else if (this.raza === 'GRANDE' && (value < 0 || value > 30)) {
          throw new Error('El tamaño para perros grandes debe ser entre 0 y 30 kgs.');
        } else if (this.raza === 'GIGANTE' && (value < 30 || value > 82)) {
          throw new Error('El tamaño para perros gigantes debe ser entre 30 y 82 kgs.');
        }
      }
    },
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
    type: DataTypes.ENUM('BAJO', 'MEDIO', 'ALTO'),
    allowNull: false,
  },
}, {
  schema: "patitasfelices",
  tableName: 'tb_perro',
  timestamps: true,
});
