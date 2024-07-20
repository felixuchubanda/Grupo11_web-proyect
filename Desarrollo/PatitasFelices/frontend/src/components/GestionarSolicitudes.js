import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GestionarSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [perros, setPerros] = useState([]);
  const [adoptantes, setAdoptantes] = useState([]);
  const [form, setForm] = useState({
    id_perro: '',
    id_adoptante: '',
    comentario: '',
    descripcion: '',
    estado: 'pendiente',
    fechaSolicitud: new Date().toISOString().split('T')[0],  // Fecha actual
    rechazado_por_devolucion: false
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [errors, setErrors] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchSolicitudes();
    fetchPerros();
    fetchAdoptantes();
  }, [currentPage, filters]);

  const fetchSolicitudes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/solicitudes-adopcion', {
        params: { page: currentPage, ...filters }
      });
      setSolicitudes(response.data.solicitudes || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching solicitudes:', error);
    }
  };  

  const fetchPerros = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/perros', {
        params: { estado: [1, 5] }
      });
      setPerros(response.data.perros || []);
    } catch (error) {
      console.error('Error fetching perros:', error);
    }
  };

  const fetchAdoptantes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/adoptantes');
      setAdoptantes(response.data || []);
    } catch (error) {
      console.error('Error fetching adoptantes:', error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.id_perro) {
      newErrors.id_perro = 'El perro es obligatorio.';
    }
    if (!form.id_adoptante) {
      newErrors.id_adoptante = 'El adoptante es obligatorio.';
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
        await axios.put(`http://localhost:3000/api/solicitudes-adopcion/${currentId}`, form);
      } else {
        await axios.post('http://localhost:3000/api/solicitudes-adopcion', form);
      }
      fetchSolicitudes();
      resetForm();
    } catch (error) {
      console.error('Error saving solicitud:', error.response ? error.response.data : error.message);
      if (error.response) {
        setErrors({ server: error.response.data.message });
      }
    }
  };

  const resetForm = () => {
    setForm({
      id_perro: '',
      id_adoptante: '',
      comentario: '',
      descripcion: '',
      estado: 'pendiente',
      fechaSolicitud: new Date().toISOString().split('T')[0],  // Fecha actual
      rechazado_por_devolucion: false
    });
    setIsEditing(false);
    setCurrentId(null);
    setErrors({});
  };

  const handleEdit = (solicitud) => {
    setForm({
      ...solicitud,
      fechaSolicitud: new Date(solicitud.fechaSolicitud).toISOString().split('T')[0] // Convertir fecha a formato adecuado para el input date
    });
    setIsEditing(true);
    setCurrentId(solicitud.idSolicitud);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/solicitudes-adopcion/${id}`);
      fetchSolicitudes();
    } catch (error) {
      console.error('Error deleting solicitud:', error);
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
    fetchSolicitudes();
  };

  return (
    <div>
      <h2>Gestionar Solicitudes</h2>
      <button onClick={resetForm}>Crear Nueva Solicitud</button>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Perro</label>
          <select value={form.id_perro} onChange={(e) => setForm({ ...form, id_perro: e.target.value })}>
            <option value="">Seleccione un perro</option>
            {perros.map(perro => (
              <option key={perro.id_perro} value={perro.id_perro}>{perro.nombre}</option>
            ))}
          </select>
          {errors.id_perro && <p>{errors.id_perro}</p>}
        </div>
        <div>
          <label>Adoptante</label>
          <select value={form.id_adoptante} onChange={(e) => setForm({ ...form, id_adoptante: e.target.value })}>
            <option value="">Seleccione un adoptante</option>
            {adoptantes.map(adoptante => (
              <option key={adoptante.id_adoptante} value={adoptante.id_adoptante}>{adoptante.nombre} {adoptante.apellido}</option>
            ))}
          </select>
          {errors.id_adoptante && <p>{errors.id_adoptante}</p>}
        </div>
        <div>
          <label>Comentario</label>
          <input type="text" value={form.comentario} onChange={(e) => setForm({ ...form, comentario: e.target.value })} />
        </div>
        <div>
          <label>Descripción</label>
          <input type="text" value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} />
        </div>
        <div>
          <label>Fecha Solicitud</label>
          <input type="date" value={form.fechaSolicitud} onChange={(e) => setForm({ ...form, fechaSolicitud: e.target.value })} />
        </div>
        <div>
          <label>Estado</label>
          <select value={form.estado} onChange={(e) => setForm({ ...form, estado: e.target.value })}>
            <option value="pendiente">Pendiente</option>
            <option value="aprobada">Aprobada</option>
            <option value="rechazada">Rechazada</option>
          </select>
        </div>
        <div>
          <label>Rechazado por Devolución</label>
          <select value={form.rechazado_por_devolucion} onChange={(e) => setForm({ ...form, rechazado_por_devolucion: e.target.value })}>
            <option value={false}>No</option>
            <option value={true}>Sí</option>
          </select>
        </div>
        <button type="submit">Guardar</button>
      </form>

      <h3>Lista de Solicitudes</h3>
      <form onSubmit={handleFilterSubmit}>
        <div>
          <label>Filtrar por Estado</label>
          <select name="estado" onChange={handleFilterChange}>
            <option value="">Todos</option>
            <option value="pendiente">Pendiente</option>
            <option value="aprobada">Aprobada</option>
            <option value="rechazada">Rechazada</option>
          </select>
        </div>
        <button type="submit">Filtrar</button>
      </form>
      
      <table>
        <thead>
          <tr>
            <th>Perro</th>
            <th>Adoptante</th>
            <th>Comentario</th>
            <th>Descripción</th>
            <th>Fecha Solicitud</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {solicitudes.map(solicitud => (
            <tr key={solicitud.idSolicitud}>
              <td>{solicitud.id_perro}</td>
              <td>{solicitud.id_adoptante}</td>
              <td>{solicitud.comentario}</td>
              <td>{solicitud.descripcion}</td>
              <td>{solicitud.fechaSolicitud}</td>
              <td>{solicitud.estado}</td>
              <td>
                <button onClick={() => handleEdit(solicitud)}>Editar</button>
                <button onClick={() => handleDelete(solicitud.idSolicitud)}>Eliminar</button>
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

export default GestionarSolicitudes;
