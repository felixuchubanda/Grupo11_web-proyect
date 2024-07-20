import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/EditarAdoptante.css';

const EditarAdoptante = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    genero: 'M',
    direccion: '',
    telefono: '',
    email: '',
    contrasena: '',
    edad: '',
    tiene_ninos: 'SI',
    tiene_mascota: 'SI',
    nivel_actividad: '',
    nivel_energia: '',
    tamano_perro_preferido: 'PEQUEÑO',
    experiencia_con_perros: 'PRINCIPIANTE'
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchAdoptante = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/adoptantes/${id}`);
        setForm(response.data);
      } catch (error) {
        console.error('Error fetching adoptante:', error);
      }
    };

    fetchAdoptante();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const cedulaRegex = /^\d{10}$/;

    if (!form.nombre || !nameRegex.test(form.nombre) || form.nombre.length < 3) {
      newErrors.nombre = 'El nombre solo debe contener letras y debe tener al menos 3 caracteres.';
    }
    if (!form.apellido || !nameRegex.test(form.apellido) || form.apellido.length < 3) {
      newErrors.apellido = 'El apellido solo debe contener letras y debe tener al menos 3 caracteres.';
    }
    if (!form.cedula || !cedulaRegex.test(form.cedula)) {
      newErrors.cedula = 'Ingrese una cédula válida de 10 dígitos.';
    }
    if (!form.email || !form.email.includes('@')) {
      newErrors.email = 'Ingrese un email válido.';
    }
    if (form.contrasena && !passwordRegex.test(form.contrasena)) {
      newErrors.contrasena = 'La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula y un número.';
    }
    if (form.edad < 18 || form.edad > 70) {
      newErrors.edad = 'El adoptante debe tener al menos 18 años y no más de 70 años.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      await axios.put(`http://localhost:3000/api/adoptantes/${id}`, form);
      navigate('/gestionar/adoptantes/listar');
    } catch (error) {
      console.error('Error updating adoptante:', error.response ? error.response.data : error.message);
    }
  };

  const handleCancel = () => {
    navigate('/gestionar/adoptantes/listar');
  };

  return (
    <div className="editar-adoptante-container">
      <h2>Editar Adoptante</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input type="text" name="nombre" value={form.nombre} onChange={handleInputChange} />
          {errors.nombre && <p>{errors.nombre}</p>}
        </div>
        <div>
          <label>Apellido</label>
          <input type="text" name="apellido" value={form.apellido} onChange={handleInputChange} />
          {errors.apellido && <p>{errors.apellido}</p>}
        </div>
        <div>
          <label>Cédula</label>
          <input type="text" name="cedula" value={form.cedula} onChange={handleInputChange} />
          {errors.cedula && <p>{errors.cedula}</p>}
        </div>
        <div>
          <label>Género</label>
          <select name="genero" value={form.genero} onChange={handleInputChange}>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
        </div>
        <div>
          <label>Dirección</label>
          <input type="text" name="direccion" value={form.direccion} onChange={handleInputChange} />
          {errors.direccion && <p>{errors.direccion}</p>}
        </div>
        <div>
          <label>Teléfono</label>
          <input type="text" name="telefono" value={form.telefono} onChange={handleInputChange} />
          {errors.telefono && <p>{errors.telefono}</p>}
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleInputChange} />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label>Contraseña</label>
          <input type="password" name="contrasena" value={form.contrasena} onChange={handleInputChange} />
          {errors.contrasena && <p>{errors.contrasena}</p>}
        </div>
        <div>
          <label>Edad</label>
          <input type="number" name="edad" value={form.edad} onChange={handleInputChange} />
          {errors.edad && <p>{errors.edad}</p>}
        </div>
        <div>
          <label>Tiene niños</label>
          <select name="tiene_ninos" value={form.tiene_ninos} onChange={handleInputChange}>
            <option value="SI">Sí</option>
            <option value="NO">No</option>
          </select>
        </div>
        <div>
          <label>Tiene mascota</label>
          <select name="tiene_mascota" value={form.tiene_mascota} onChange={handleInputChange}>
            <option value="SI">Sí</option>
            <option value="NO">No</option>
          </select>
        </div>
        <div>
          <label>Nivel de actividad</label>
          <input type="number" name="nivel_actividad" value={form.nivel_actividad} onChange={handleInputChange} />
          {errors.nivel_actividad && <p>{errors.nivel_actividad}</p>}
        </div>
        <div>
          <label>Nivel de energía</label>
          <input type="number" name="nivel_energia" value={form.nivel_energia} onChange={handleInputChange} />
          {errors.nivel_energia && <p>{errors.nivel_energia}</p>}
        </div>
        <div>
          <label>Tamaño de perro preferido</label>
          <select name="tamano_perro_preferido" value={form.tamano_perro_preferido} onChange={handleInputChange}>
            <option value="PEQUEÑO">Pequeño</option>
            <option value="MEDIANO">Mediano</option>
            <option value="GRANDE">Grande</option>
          </select>
        </div>
        <div>
          <label>Experiencia con perros</label>
          <select name="experiencia_con_perros" value={form.experiencia_con_perros} onChange={handleInputChange}>
            <option value="PRINCIPIANTE">Principiante</option>
            <option value="INTERMEDIO">Intermedio</option>
            <option value="EXPERTO">Experto</option>
          </select>
        </div>
        {errors.apiError && <p>{errors.apiError}</p>}
        <button type="submit">Guardar</button>
        <button type="button" onClick={handleCancel}>Cancelar</button>
      </form>
    </div>
  );
};

export default EditarAdoptante;

