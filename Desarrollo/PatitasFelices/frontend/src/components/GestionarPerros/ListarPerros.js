import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/ListarPerros.css'; // Importar el archivo CSS personalizado

const ListarPerros = () => {
  const [perros, setPerros] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    raza: '',
    edad: '',
    tamano: '',
    estado: ''
  });
  const navigate = useNavigate();

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
  }, [fetchPerros]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleEdit = (id) => {
    navigate(`/gestionar/perros/editar/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/perros/${id}`);
      fetchPerros();
    } catch (error) {
      console.error('Error deleting perro:', error);
    }
  };

  return (
    <div className="listar-perros-container">
      <h2>Lista de Perros</h2>
      <button className="button-create" onClick={() => navigate('/gestionar/perros/crear')}>Crear Nuevo</button>
      <div className="filters">
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
      <div className="table-container">
        <table className="table">
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
                <td className="table-actions">
                  <button className="edit-btn" onClick={() => handleEdit(perro.id_perro)}>Editar</button>
                  <button className="delete-btn" onClick={() => handleDelete(perro.id_perro)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListarPerros;
