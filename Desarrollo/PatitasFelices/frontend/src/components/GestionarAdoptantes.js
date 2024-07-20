import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GestionarAdoptantes = () => {
  const [adoptantes, setAdoptantes] = useState([]);
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
    tiene_ninos: 'NO',
    tiene_mascota: 'NO',
    nivel_actividad: '',
    nivel_energia: '',
    tamano_perro_preferido: 'PEQUEÑO',
    experiencia_con_perros: 'PRINCIPIANTE',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchAdoptantes();
  }, [currentPage, filters]);

  const fetchAdoptantes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/adoptantes', {
        params: { page: currentPage, ...filters }
      });
      setAdoptantes(response.data || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching adoptantes:', error);
    }
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
    if (!isEditing && (!form.contrasena || !passwordRegex.test(form.contrasena))) {
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
      if (isEditing) {
        await axios.put(`http://localhost:3000/api/adoptantes/${currentId}`, form);
      } else {
        await axios.post('http://localhost:3000/api/adoptantes', form);
      }
      fetchAdoptantes();
      resetForm();
    } catch (error) {
      console.error('Error saving adoptante:', error.response ? error.response.data : error.message);
      if (error.response) {
        setErrors({ server: error.response.data.message });
      }
    }
  };

  const resetForm = () => {
    setForm({
      nombre: '',
      apellido: '',
      cedula: '',
      genero: 'M',
      direccion: '',
      telefono: '',
      email: '',
      contrasena: '',
      edad: '',
      tiene_ninos: 'NO',
      tiene_mascota: 'NO',
      nivel_actividad: '',
      nivel_energia: '',
      tamano_perro_preferido: 'PEQUEÑO',
      experiencia_con_perros: 'PRINCIPIANTE',
    });
    setIsEditing(false);
    setCurrentId(null);
    setErrors({});
  };

  const handleEdit = (adoptante) => {
    setForm(adoptante);
    setIsEditing(true);
    setCurrentId(adoptante.id_adoptante);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/adoptantes/${id}`);
      fetchAdoptantes();
    } catch (error) {
      console.error('Error deleting adoptante:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchAdoptantes();
  };

  return (
    <div>
      <h2>Gestionar Adoptantes</h2>
      <button onClick={resetForm}>Crear Nuevo Adoptante</button>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input type="text" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
          {errors.nombre && <p>{errors.nombre}</p>}
        </div>
        <div>
          <label>Apellido</label>
          <input type="text" value={form.apellido} onChange={(e) => setForm({ ...form, apellido: e.target.value })} />
          {errors.apellido && <p>{errors.apellido}</p>}
        </div>
        <div>
          <label>Cédula</label>
          <input type="text" value={form.cedula} onChange={(e) => setForm({ ...form, cedula: e.target.value })} />
          {errors.cedula && <p>{errors.cedula}</p>}
        </div>
        <div>
          <label>Género</label>
          <select value={form.genero} onChange={(e) => setForm({ ...form, genero: e.target.value })}>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
        </div>
        <div>
          <label>Dirección</label>
          <input type="text" value={form.direccion} onChange={(e) => setForm({ ...form, direccion: e.target.value })} />
        </div>
        <div>
          <label>Teléfono</label>
          <input type="text" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label>Contraseña</label>
          <input type="password" value={form.contrasena} onChange={(e) => setForm({ ...form, contrasena: e.target.value })} />
          {errors.contrasena && <p>{errors.contrasena}</p>}
        </div>
        <div>
          <label>Edad</label>
          <input type="number" value={form.edad} onChange={(e) => setForm({ ...form, edad: e.target.value })} />
          {errors.edad && <p>{errors.edad}</p>}
        </div>
        <div>
          <label>Tiene Niños</label>
          <select value={form.tiene_ninos} onChange={(e) => setForm({ ...form, tiene_ninos: e.target.value })}>
            <option value="SI">Sí</option>
            <option value="NO">No</option>
          </select>
        </div>
        <div>
          <label>Tiene Mascota</label>
          <select value={form.tiene_mascota} onChange={(e) => setForm({ ...form, tiene_mascota: e.target.value })}>
            <option value="SI">Sí</option>
            <option value="NO">No</option>
          </select>
        </div>
        <div>
          <label>Nivel de Actividad</label>
          <input type="number" value={form.nivel_actividad} onChange={(e) => setForm({ ...form, nivel_actividad: e.target.value })} />
        </div>
        <div>
          <label>Nivel de Energía</label>
          <input type="number" value={form.nivel_energia} onChange={(e) => setForm({ ...form, nivel_energia: e.target.value })} />
        </div>
        <div>
          <label>Tamaño del Perro Preferido</label>
          <select value={form.tamano_perro_preferido} onChange={(e) => setForm({ ...form, tamano_perro_preferido: e.target.value })}>
            <option value="PEQUEÑO">Pequeño</option>
            <option value="MEDIANO">Mediano</option>
            <option value="GRANDE">Grande</option>
          </select>
        </div>
        <div>
          <label>Experiencia con Perros</label>
          <select value={form.experiencia_con_perros} onChange={(e) => setForm({ ...form, experiencia_con_perros: e.target.value })}>
            <option value="PRINCIPIANTE">Principiante</option>
            <option value="INTERMEDIO">Intermedio</option>
            <option value="EXPERTO">Experto</option>
          </select>
        </div>
        <button type="submit">Guardar</button>
      </form>

      <h3>Lista de Adoptantes</h3>
      <form onSubmit={handleFilterSubmit}>
        <div>
          <label>Filtrar por Nombre</label>
          <input type="text" name="nombre" onChange={handleFilterChange} />
        </div>
        <button type="submit">Filtrar</button>
      </form>
      
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Cédula</th>
            <th>Género</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Edad</th>
            <th>Tiene Niños</th>
            <th>Tiene Mascota</th>
            <th>Nivel de Actividad</th>
            <th>Nivel de Energía</th>
            <th>Tamaño del Perro Preferido</th>
            <th>Experiencia con Perros</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {adoptantes.map(adoptante => (
            <tr key={adoptante.id_adoptante}>
              <td>{adoptante.nombre}</td>
              <td>{adoptante.apellido}</td>
              <td>{adoptante.cedula}</td>
              <td>{adoptante.genero}</td>
              <td>{adoptante.direccion}</td>
              <td>{adoptante.telefono}</td>
              <td>{adoptante.email}</td>
              <td>{adoptante.edad}</td>
              <td>{adoptante.tiene_ninos}</td>
              <td>{adoptante.tiene_mascota}</td>
              <td>{adoptante.nivel_actividad}</td>
              <td>{adoptante.nivel_energia}</td>
              <td>{adoptante.tamano_perro_preferido}</td>
              <td>{adoptante.experiencia_con_perros}</td>
              <td>
                <button onClick={() => handleEdit(adoptante)}>Editar</button>
                <button onClick={() => handleDelete(adoptante.id_adoptante)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GestionarAdoptantes;
