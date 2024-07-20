import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/ListarSolicitudes.css';

const ListarSolicitudes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [estado, setEstado] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/solicitudes-adopcion', {
          params: { page: currentPage, estado }
        });
        setSolicitudes(response.data.solicitudes || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error('Error fetching solicitudes:', error);
      }
    };

    fetchSolicitudes();
  }, [currentPage, estado]);

  return (
    <div className="listar-solicitudes-container">
      <h2>Todas las Solicitudes</h2>
      <button className="new-solicitud-button" onClick={() => navigate('/gestionar/solicitudes/crear')}>
        Nueva Solicitud
      </button>
      <button className="pendientes-solicitud-button" onClick={() => navigate('/gestionar/solicitudes/pendientes')}>
        Ver Pendientes
      </button>
      <div className="filter-container">
        <label htmlFor="estado">Filtrar por estado:</label>
        <select id="estado" value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="">Todos</option>
          <option value="pendiente">Pendiente</option>
          <option value="aprobada">Aprobada</option>
          <option value="rechazada">Rechazada</option>
        </select>
      </div>
      {solicitudes.length === 0 ? (
        <p>No hay solicitudes.</p>
      ) : (
        <div className="table-container">
          <table className="solicitudes-table">
            <thead>
              <tr>
                <th>Adoptante</th>
                <th>Perro</th>
                <th>Comentario</th>
                <th>Descripción</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {solicitudes.map((solicitud) => (
                <tr key={solicitud.idSolicitud}>
                  <td>{solicitud.tb_adoptante ? `${solicitud.tb_adoptante.nombre} ${solicitud.tb_adoptante.apellido}` : solicitud.id_adoptante}</td>
                  <td>{solicitud.tb_perro ? solicitud.tb_perro.nombre : solicitud.id_perro}</td>
                  <td>{solicitud.comentario}</td>
                  <td>{solicitud.descripcion}</td>
                  <td>{solicitud.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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

export default ListarSolicitudes;
