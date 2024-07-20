import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/RegistrarDevolucion.css';

const RegistrarDevolucion = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/solicitudes-adopcion', {
          params: { estado: 'aprobada', page: currentPage }
        });
        setSolicitudes(response.data.solicitudes || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error('Error fetching solicitudes aprobadas:', error);
      }
    };

    fetchSolicitudes();
  }, [currentPage]);

  const handleDevolucion = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/solicitudes-adopcion/${id}`, { rechazado_por_devolucion: true });
      setSolicitudes(solicitudes.filter(solicitud => solicitud.idSolicitud !== id));
    } catch (error) {
      console.error('Error marking solicitud as devolución:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="registrar-devolucion-container">
      <h2>Registrar Devolución</h2>
      {solicitudes.length === 0 ? (
        <p>No hay solicitudes aprobadas para devolver.</p>
      ) : (
        <div className="table-container">
          <table className="solicitudes-table">
            <thead>
              <tr>
                <th>Adoptante</th>
                <th>Perro</th>
                <th>Comentario</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {solicitudes.map((solicitud) => (
                <tr key={solicitud.idSolicitud}>
                  <td>{solicitud.tb_adoptante ? `${solicitud.tb_adoptante.nombre} ${solicitud.tb_adoptante.apellido}` : solicitud.id_adoptante}</td>
                  <td>{solicitud.tb_perro ? solicitud.tb_perro.nombre : solicitud.id_perro}</td>
                  <td>{solicitud.comentario}</td>
                  <td>{solicitud.descripcion}</td>
                  <td>
                    <button onClick={() => handleDevolucion(solicitud.idSolicitud)}>Marcar como Devolución</button>
                  </td>
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

export default RegistrarDevolucion;
