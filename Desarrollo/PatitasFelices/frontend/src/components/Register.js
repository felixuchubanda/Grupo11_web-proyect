import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MessageModal from './MessageModal'; // Asegúrate de que la ruta sea correcta
import '../styles/Register.css'; // Asegúrate de que la ruta sea correcta

const Register = () => {
  const [tipo, setTipo] = useState('adoptante');
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    contrasena: '',
    cedula: '',
    genero: 'M',
    direccion: '',
    telefono: '',
    edad: '',
    tiene_ninos: 'NO',
    tiene_mascota: 'NO',
    nivel_actividad: '1',
    nivel_energia: '1',
    tamano_perro_preferido: 'PEQUEÑO',
    experiencia_con_perros: 'PRINCIPIANTE',
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState(''); // 'success' para éxitos y 'error' para errores
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { nombre, apellido, email, contrasena, cedula, edad } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const nameRegex = /^[A-Za-z\s]+$/;

    if (!nameRegex.test(nombre) || nombre.length < 3) {
      alert('El nombre solo debe contener letras y debe tener al menos 3 caracteres.');
      return false;
    }

    if (!nameRegex.test(apellido) || apellido.length < 3) {
      alert('El apellido solo debe contener letras y debe tener al menos 3 caracteres.');
      return false;
    }

    if (!emailRegex.test(email)) {
      alert('Ingrese un correo electrónico válido.');
      return false;
    }

    if (!passwordRegex.test(contrasena)) {
      alert('La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula y un número.');
      return false;
    }

    if (tipo === 'adoptante') {
      if (cedula.length !== 10 || !/^\d+$/.test(cedula)) {
        alert('Ingrese una cédula válida de 10 dígitos.');
        return false;
      }

      if (edad < 18 || edad > 70) {
        alert('El adoptante debe tener al menos 18 años y no más de 70 años.');
        return false;
      }
    }

    return true;
  };

  const handleRegister = async () => {
    if (validateForm()) {
      try {
        let dataToSend = { ...formData, tipo };

        if (tipo === 'adoptante') {
          await axios.post('http://localhost:3000/api/adoptantes', formData);
        } else {
          if (tipo === 'empleado') {
            dataToSend.nivel_acceso = 'medio';
          } else if (tipo === 'administrador') {
            dataToSend.nivel_acceso = 'alto';
          }
          await axios.post('http://localhost:3000/api/usuarios', dataToSend);
        }

        setModalMessage('Registro exitoso');
        setModalType('success');
        setModalOpen(true);

        setTimeout(() => {
          setModalOpen(false);
          navigate('/login'); // Redirigir al login después de 2 segundos
        }, 2000);

      } catch (error) {
        console.error('Error en el registro:', error.response.data);
        setModalMessage('Error en el registro: ' + error.response.data.message);
        setModalType('error');
        setModalOpen(true);
      }
    }
  };

  return (
    <div className="container">
      <h2>Registrarse</h2>
      <label>
        Tipo de Usuario:
        <select name="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="adoptante">Adoptante</option>
          <option value="empleado">Empleado</option>
          <option value="administrador">Administrador</option>
        </select>
      </label>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
      />
      <input
        type="text"
        name="apellido"
        placeholder="Apellido"
        value={formData.apellido}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Correo Electrónico"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="contrasena"
        placeholder="Contraseña"
        value={formData.contrasena}
        onChange={handleChange}
      />

      {tipo === 'adoptante' && (
        <>
          <input
            type="text"
            name="cedula"
            placeholder="Cédula"
            value={formData.cedula}
            onChange={handleChange}
          />
          <label>
            Género:
            <select name="genero" value={formData.genero} onChange={handleChange}>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </label>
          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={formData.direccion}
            onChange={handleChange}
          />
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
          />
          <input
            type="number"
            name="edad"
            placeholder="Edad"
            value={formData.edad}
            onChange={handleChange}
          />
          <label>
            ¿Tiene niños?:
            <select name="tiene_ninos" value={formData.tiene_ninos} onChange={handleChange}>
              <option value="SI">Sí</option>
              <option value="NO">No</option>
            </select>
          </label>
          <label>
            ¿Tiene mascotas?:
            <select name="tiene_mascota" value={formData.tiene_mascota} onChange={handleChange}>
              <option value="SI">Sí</option>
              <option value="NO">No</option>
            </select>
          </label>
          <label>
            Nivel de Actividad:
            <select name="nivel_actividad" value={formData.nivel_actividad} onChange={handleChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>
          <label>
            Nivel de Energía:
            <select name="nivel_energia" value={formData.nivel_energia} onChange={handleChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>
          <label>
            Tamaño del Perro Preferido:
            <select name="tamano_perro_preferido" value={formData.tamano_perro_preferido} onChange={handleChange}>
              <option value="PEQUEÑO">Pequeño</option>
              <option value="MEDIANO">Mediano</option>
              <option value="GRANDE">Grande</option>
            </select>
          </label>
          <label>
            Experiencia con Perros:
            <select name="experiencia_con_perros" value={formData.experiencia_con_perros} onChange={handleChange}>
              <option value="PRINCIPIANTE">Principiante</option>
              <option value="INTERMEDIO">Intermedio</option>
              <option value="EXPERTO">Experto</option>
            </select>
          </label>
        </>
      )}

      <button onClick={handleRegister}>Registrarse</button>

      <MessageModal
        isOpen={modalOpen}
        message={modalMessage}
        onClose={() => setModalOpen(false)}
        type={modalType}
      />
    </div>
  );
};

export default Register;
