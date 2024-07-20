import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/SolicitudesPendientes.css'; // Importar el archivo CSS personalizado

const SolicitudesPendientes = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSolicitudesPendientes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/solicitudes-adopcion', {
          params: { estado: 'pendiente' }
        });
        setSolicitudes(response.data.solicitudes || []); // Asegúrate de que `solicitudes` sea un array
      } catch (error) {
        console.error('Error fetching solicitudes pendientes:', error);
      }
    };

    fetchSolicitudesPendientes();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/solicitudes-adopcion/${id}`, { estado: 'aprobada' });
      // Refrescar la lista de solicitudes pendientes
      setSolicitudes(solicitudes.filter(solicitud => solicitud.idSolicitud !== id));
    } catch (error) {
      console.error('Error approving solicitud:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/solicitudes-adopcion/${id}`, { estado: 'rechazada' });
      // Refrescar la lista de solicitudes pendientes
      window.location.reload();
      setSolicitudes(solicitudes.filter(solicitud => solicitud.idSolicitud !== id));
    } catch (error) {
      console.error('Error rejecting solicitud:', error);
    }
  };

  return (
    <div className="solicitudes-pendientes-container">
      <h2>Solicitudes Pendientes</h2>
      <div className="table-container">
        <table className="solicitudes-table">
          <thead>
            <tr>
              <th>Adoptante</th>
              <th>Perro</th>
              <th>Fecha de Solicitud</th>
              <th>Comentario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((solicitud) => (
              <tr key={solicitud.idSolicitud}>
                <td>{solicitud.tb_adoptante ? `${solicitud.tb_adoptante.nombre} ${solicitud.tb_adoptante.apellido}` : solicitud.id_adoptante}</td>
                <td>{solicitud.tb_perro ? solicitud.tb_perro.nombre : solicitud.id_perro}</td>
                <td>{new Date(solicitud.fechaSolicitud).toLocaleDateString()}</td>
                <td>{solicitud.comentario}</td>
                <td>
                  <button className="approve" onClick={() => handleApprove(solicitud.idSolicitud)}>Aprobar</button>
                  <button className="reject" onClick={() => handleReject(solicitud.idSolicitud)}>Rechazar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SolicitudesPendientes;
