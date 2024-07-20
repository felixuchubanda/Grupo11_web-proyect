import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const GestionarPerros = () => {
  const [perros, setPerros] = useState([]);
  const [form, setForm] = useState({
    nombre: '',
    imagen_url: '',
    edad: '',
    raza: 'PEQUEÑO',
    tamano: '',
    genero: 'Macho',
    descripcion: '',
    nivel_energia: '',
    bueno_con_ninos: 'Si',
    bueno_con_mascota: 'Si',
    nivel_formacion: 'BAJO',
    id_estado: 1
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    raza: '',
    edad: '',
    tamano: '',
    estado: ''
  });

  const fetchPerros = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/perros', {
        params: { page: currentPage, ...filters }
      });
      setPerros(response.data.perros);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching perros:', error);
    }
  }, [currentPage, filters]);

  useEffect(() => {
    fetchPerros();
  }, [currentPage, filters, fetchPerros]);

  const validateForm = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(form.nombre) || form.nombre.length < 3) {
      newErrors.nombre = 'El nombre solo debe contener letras y debe tener al menos 3 caracteres.';
    }
    if (!form.imagen_url) {
      newErrors.imagen_url = 'La URL de la imagen es obligatoria.';
    }
    if (!form.edad || form.edad < 1 || form.edad > 15) {
      newErrors.edad = 'La edad del perro debe estar entre 1 y 15 años.';
    }
    if (!form.tamano) {
      newErrors.tamano = 'El tamaño es obligatorio.';
    } else {
      if (form.raza === 'PEQUEÑO' && (form.tamano < 0 || form.tamano > 9.9)) {
        newErrors.tamano = 'El tamaño para perros pequeños debe ser entre 0 y 9.9 kgs.';
      } else if (form.raza === 'MEDIANO' && (form.tamano < 0 || form.tamano > 18)) {
        newErrors.tamano = 'El tamaño para perros medianos debe ser entre 0 y 18 kgs.';
      } else if (form.raza === 'GRANDE' && (form.tamano < 0 || form.tamano > 30)) {
        newErrors.tamano = 'El tamaño para perros grandes debe ser entre 0 y 30 kgs.';
      } else if (form.raza === 'GIGANTE' && (form.tamano < 30 || form.tamano > 82)) {
        newErrors.tamano = 'El tamaño para perros gigantes debe ser entre 30 y 82 kgs.';
      }
    }
    if (!form.descripcion) {
      newErrors.descripcion = 'La descripción es obligatoria.';
    }
    if (!form.nivel_energia || form.nivel_energia < 1 || form.nivel_energia > 5) {
      newErrors.nivel_energia = 'El nivel de energía debe estar entre 1 y 5.';
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
        await axios.put(`http://localhost:3000/api/perros/${currentId}`, form);
      } else {
        await axios.post('http://localhost:3000/api/perros', form);
      }
      fetchPerros();
      resetForm();
    } catch (error) {
      console.error('Error saving perro:', error.response ? error.response.data : error.message);
    }
  };

  const resetForm = () => {
    setForm({
      nombre: '',
      imagen_url: '',
      edad: '',
      raza: 'PEQUEÑO',
      tamano: '',
      genero: 'Macho',
      descripcion: '',
      nivel_energia: '',
      bueno_con_ninos: 'Si',
      bueno_con_mascota: 'Si',
      nivel_formacion: 'BAJO',
      id_estado: 1
    });
    setIsEditing(false);
    setCurrentId(null);
    setErrors({});
  };

  const handleEdit = (perro) => {
    setForm({
      ...perro,
      id_estado: perro.id_estado // Asegurar que el estado se mantenga igual al editar
    });
    setIsEditing(true);
    setCurrentId(perro.id_perro);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/perros/${id}`);
      fetchPerros();
    } catch (error) {
      console.error('Error deleting perro:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <h2>Gestionar Perros</h2>
      <button onClick={resetForm}>Crear Nuevo Perro</button>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input type="text" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
          {errors.nombre && <p>{errors.nombre}</p>}
        </div>
        <div>
          <label>URL de Imagen</label>
          <input type="text" value={form.imagen_url} onChange={(e) => setForm({ ...form, imagen_url: e.target.value })} />
          {errors.imagen_url && <p>{errors.imagen_url}</p>}
        </div>
        <div>
          <label>Edad</label>
          <input type="number" value={form.edad} onChange={(e) => setForm({ ...form, edad: e.target.value })} />
          {errors.edad && <p>{errors.edad}</p>}
        </div>
        <div>
          <label>Raza</label>
          <select value={form.raza} onChange={(e) => setForm({ ...form, raza: e.target.value })}>
            <option value="PEQUEÑO">Pequeño</option>
            <option value="MEDIANO">Mediano</option>
            <option value="GRANDE">Grande</option>
            <option value="GIGANTE">Gigante</option>
          </select>
        </div>
        <div>
          <label>Tamaño</label>
          <input type="number" value={form.tamano} onChange={(e) => setForm({ ...form, tamano: e.target.value })} />
          {errors.tamano && <p>{errors.tamano}</p>}
        </div>
        <div>
          <label>Género</label>
          <select value={form.genero} onChange={(e) => setForm({ ...form, genero: e.target.value })}>
            <option value="Macho">Macho</option>
            <option value="Hembra">Hembra</option>
          </select>
        </div>
        <div>
          <label>Descripción</label>
          <textarea value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })}></textarea>
          {errors.descripcion && <p>{errors.descripcion}</p>}
        </div>
        <div>
          <label>Nivel de Energía</label>
          <input type="number" value={form.nivel_energia} onChange={(e) => setForm({ ...form, nivel_energia: e.target.value })} />
          {errors.nivel_energia && <p>{errors.nivel_energia}</p>}
        </div>
        <div>
          <label>Bueno con Niños</label>
          <select value={form.bueno_con_ninos} onChange={(e) => setForm({ ...form, bueno_con_ninos: e.target.value })}>
            <option value="Si">Si</option>
            <option value="No">No</option>
          </select>
        </div>
        <div>
          <label>Bueno con Mascotas</label>
          <select value={form.bueno_con_mascota} onChange={(e) => setForm({ ...form, bueno_con_mascota: e.target.value })}>
            <option value="Si">Si</option>
            <option value="No">No</option>
          </select>
        </div>
        <div>
          <label>Nivel de Formación</label>
          <select value={form.nivel_formacion} onChange={(e) => setForm({ ...form, nivel_formacion: e.target.value })}>
            <option value="BAJO">Bajo</option>
            <option value="MEDIO">Medio</option>
            <option value="ALTO">Alto</option>
          </select>
        </div>
        {/* Eliminado el campo Estado */}
        <button type="submit">Guardar</button>
      </form>

      <h3>Lista de Perros</h3>
      <div>
        <label>
          Raza:
          <input type="text" name="raza" value={filters.raza} onChange={handleFilterChange} />
        </label>
        <label>
          Edad:
          <input type="number" name="edad" value={filters.edad} onChange={handleFilterChange} />
        </label>
        <label>
          Tamaño:
          <input type="text" name="tamano" value={filters.tamano} onChange={handleFilterChange} />
        </label>
        <label>
          Estado:
          <select name="estado" value={filters.estado} onChange={handleFilterChange}>
            <option value="">Todos</option>
            <option value="1">Disponible</option>
            <option value="2">Adoptado</option>
            <option value="3">Enfermo</option>
            <option value="4">Fallecido</option>
            <option value="5">Devuelto</option>
          </select>
        </label>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Raza</th>
            <th>Edad</th>
            <th>Tamaño</th>
            <th>Género</th>
            <th>Descripción</th>
            <th>Nivel de Energía</th>
            <th>Bueno con Niños</th>
            <th>Bueno con Mascotas</th>
            <th>Nivel de Formación</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {perros.map(perro => (
            <tr key={perro.id_perro}>
              <td>{perro.nombre}</td>
              <td>{perro.raza}</td>
              <td>{perro.edad}</td>
              <td>{perro.tamano}</td>
              <td>{perro.genero}</td>
              <td>{perro.descripcion}</td>
              <td>{perro.nivel_energia}</td>
              <td>{perro.bueno_con_ninos}</td>
              <td>{perro.bueno_con_mascota}</td>
              <td>{perro.nivel_formacion}</td>
              <td>{['', 'Disponible', 'Adoptado', 'Enfermo', 'Fallecido', 'Devuelto'][perro.id_estado]}</td>
              <td>
                <button onClick={() => handleEdit(perro)}>Editar</button>
                <button onClick={() => handleDelete(perro.id_perro)}>Eliminar</button>
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

export default GestionarPerros;
