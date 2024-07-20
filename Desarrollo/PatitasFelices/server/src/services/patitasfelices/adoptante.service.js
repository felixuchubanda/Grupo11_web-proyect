import AdoptanteRepository from '../../repositories/patitasfelices/adoptante.repository.js';
import UsuarioRepository from '../../repositories/patitasfelices/usuario.repository.js';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import { sequelize } from '../../database/database.js';

const AdoptanteService = {
    createAdoptante: async (adoptanteData) => {
        const { cedula, email, contrasena, edad, nombre, apellido, genero, direccion, telefono, tiene_ninos, tiene_mascota, nivel_actividad, nivel_energia, tamano_perro_preferido, experiencia_con_perros } = adoptanteData;

        // Validación de campos obligatorios
        if (!cedula || !email || !contrasena || !edad || !nombre || !apellido || !genero || !direccion || !telefono || !tiene_ninos || !tiene_mascota || !nivel_actividad || !nivel_energia || !tamano_perro_preferido || !experiencia_con_perros) {
            throw new Error('Todos los campos son obligatorios.');
        }

        // Validación de nombre y apellido solo letras y mínimo 3 caracteres
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!nameRegex.test(nombre) || nombre.length < 3) {
            throw new Error('El nombre solo debe contener letras y debe tener al menos 3 caracteres.');
        }
        if (!nameRegex.test(apellido) || apellido.length < 3) {
            throw new Error('El apellido solo debe contener letras y debe tener al menos 3 caracteres.');
        }

        // Verificación de edad
        if (edad < 18 || edad > 70) {
            throw new Error('El adoptante debe tener al menos 18 años y no más de 70 años.');
        }

        // Validación de cédula
        if (cedula.length !== 10 || !/^\d+$/.test(cedula)) {
            throw new Error("Ingrese una cédula válida de 10 dígitos.");
        } else {
            // Convertir la cédula a un array de números
            let digitos = cedula.split('').map(Number);
          
            // Extraer el último dígito (dígito verificador)
            const digitoVerificador = digitos.pop();
          
            // Multiplicar los dígitos impares por 2 y sumar los dígitos
            const sumaImpares = digitos.filter((_, index) => index % 2 === 0).reduce((acc, val) => {
              let multiplicacion = val * 2;
              if (multiplicacion >= 10) multiplicacion -= 9;
              return acc + multiplicacion;
            }, 0);
          
            // Sumar los dígitos pares
            const sumaPares = digitos.filter((_, index) => index % 2 !== 0).reduce((acc, val) => acc + val, 0);
          
            // Sumar pares e impares
            const sumaTotal = sumaImpares + sumaPares;
          
            // Obtener el número inmediato superior múltiplo de 10
            const digitoCalculado = (Math.ceil(sumaTotal / 10) * 10 - sumaTotal) % 10;
          
            // Verificar si el dígito calculado coincide con el dígito verificador
            if (digitoCalculado !== digitoVerificador) {
              throw new Error("Ingrese una cédula válida.");
            }
        }

        // Verificación de cédula y email únicos
        const existingAdoptante = await AdoptanteRepository.getAdoptanteByCedulaOEmail(cedula, email);

        console.log('existingAdoptante:', existingAdoptante); // Debug

        if (existingAdoptante.length > 0) {
            throw new Error('La cédula o el email ya están registrados.');
        }

        // Validación de la contraseña
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!passwordRegex.test(contrasena)) {
            throw new Error('La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula y un número.');
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(contrasena, 10);

        // Crear el usuario
        const usuarioData = {
            nombre,
            apellido,
            email,
            contrasena: hashedPassword,
            nivel_acceso: 'bajo',
            tipo: 'adoptante'
        };
        const usuario = await UsuarioRepository.createUsuario(usuarioData);

        // Crear el adoptante con el id_usuario del usuario recién creado
        adoptanteData.id_usuario = usuario.id_usuario;
        adoptanteData.contrasena = hashedPassword;

        return AdoptanteRepository.createAdoptante(adoptanteData);
    },

    getAllAdoptantes: async (pagination) => {
        return AdoptanteRepository.getAllAdoptantes(pagination);
    },

    countAllAdoptantes: async (filters) => {
        return AdoptanteRepository.countAllAdoptantes(filters);
    },

    getAdoptanteById: async (id) => {
        return AdoptanteRepository.getAdoptanteById(id);
    },

    updateAdoptante: async (id, adoptanteData) => {
        return AdoptanteRepository.updateAdoptante(id, adoptanteData);
    },
    
    getAdoptanteByCedula: async (cedula) => {
        return AdoptanteRepository.getAdoptanteByCedula(cedula);
    },

    deleteAdoptante: async (id) => {
        return sequelize.transaction(async (transaction) => {
            const adoptante = await AdoptanteRepository.getAdoptanteById(id);
            if (adoptante) {
                await AdoptanteRepository.deleteAdoptante(id, transaction);
                await UsuarioRepository.deleteUsuario(adoptante.id_usuario, transaction);
                return true;
            }
            return false;
        });
    },

    loginAdoptante: async (email, contrasena) => {
        const adoptante = await AdoptanteRepository.getAllAdoptantes({
            where: { email }
        });

        if (adoptante.length === 0) {
            throw new Error('Email o contraseña incorrectos.');
        }

        const validPassword = await bcrypt.compare(contrasena, adoptante[0].contrasena);

        if (!validPassword) {
            throw new Error('Email o contraseña incorrectos.');
        }

        return adoptante[0];
    },

    getAdoptantesOrdenadosPorNombre: async () => {
        return AdoptanteRepository.getAllAdoptantes({
            order: [['nombre', 'ASC']]
        });
    },
};

export default AdoptanteService;
