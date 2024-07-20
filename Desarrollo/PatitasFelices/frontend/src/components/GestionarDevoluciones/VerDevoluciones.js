import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/VerDevoluciones.css';

const VerDevoluciones = () => {
  const [devoluciones, setDevoluciones] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchDevoluciones = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/solicitudes-adopcion/devoluciones', {
          params: { page: currentPage }
        });
        setDevoluciones(response.data.solicitudes || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error('Error fetching devoluciones:', error);
      }
    };

    fetchDevoluciones();
  }, [currentPage]);

  return (
    <div className="ver-devoluciones-container">
      <h2>Historial de Devoluciones</h2>
      {devoluciones.length === 0 ? (
        <p>No hay devoluciones registradas.</p>
      ) : (
        <div className="table-container">
          <table className="devoluciones-table">
            <thead>
              <tr>
                <th>Adoptante</th>
                <th>Perro</th>
                <th>Fecha de Solicitud</th>
                <th>Fecha de Devolución</th>
              </tr>
            </thead>
            <tbody>
              {devoluciones.map((devolucion) => (
                <tr key={devolucion.idSolicitud}>
                  <td>{devolucion.tb_adoptante ? `${devolucion.tb_adoptante.nombre} ${devolucion.tb_adoptante.apellido}` : devolucion.id_adoptante}</td>
                  <td>{devolucion.tb_perro ? devolucion.tb_perro.nombre : devolucion.id_perro}</td>
                  <td>{new Date(devolucion.fechaSolicitud).toLocaleDateString()}</td>
                  <td>{devolucion.fecha_devolucion ? new Date(devolucion.fecha_devolucion).toLocaleDateString() : 'N/A'}</td>
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

export default VerDevoluciones;
