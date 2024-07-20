import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/CrearEmpleado.css';

const CrearEmpleado = () => {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    contrasena: '',
    tipo: 'empleado'
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!form.nombre) newErrors.nombre = 'El nombre es obligatorio.';
    if (!form.apellido) newErrors.apellido = 'El apellido es obligatorio.';
    if (!form.email || !emailRegex.test(form.email)) newErrors.email = 'Ingrese un email válido.';
    if (!form.contrasena || !passwordRegex.test(form.contrasena)) newErrors.contrasena = 'La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula y un número.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/usuarios', form);
      navigate('/gestionar/empleados/listar');
    } catch (error) {
      console.error('Error saving empleado:', error.response ? error.response.data : error.message);
      if (error.response && error.response.data.message === 'No se pueden agregar más de 2 empleados en el sistema.') {
        setErrors({ general: 'No se pueden agregar más de 2 empleados en el sistema.' });
      }
    }
  };

  const handleCancel = () => {
    navigate('/gestionar/empleados/listar');
  };

  return (
    <div className="crear-empleado-container">
      <h2>Crear Empleado</h2>
      {errors.general && <p>{errors.general}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" name="nombre" value={form.nombre} onChange={handleInputChange} />
          {errors.nombre && <p className="error">{errors.nombre}</p>}
        </div>
        <div className="form-group">
          <label>Apellido</label>
          <input type="text" name="apellido" value={form.apellido} onChange={handleInputChange} />
          {errors.apellido && <p className="error">{errors.apellido}</p>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleInputChange} />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input type="password" name="contrasena" value={form.contrasena} onChange={handleInputChange} />
          {errors.contrasena && <p className="error">{errors.contrasena}</p>}
        </div>
        <div className="form-buttons">
          <button type="submit" className="save-btn">Guardar</button>
          <button type="button" className="cancel-btn" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default CrearEmpleado;
