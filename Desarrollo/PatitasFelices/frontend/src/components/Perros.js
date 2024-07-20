import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import Solicitar from './Solicitar';
import Modal from 'react-modal';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Perros.css';

const Perros = () => {
  const { auth, setRedirectPath } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [perros, setPerros] = useState([]);
  const [filters, setFilters] = useState({
    raza: '',
    edad: '',
    tamano: '',
  });
  const [selectedPerroId, setSelectedPerroId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loginPromptOpen, setLoginPromptOpen] = useState(false); // Nuevo estado para el modal de inicio de sesión

  useEffect(() => {
    fetchPerros();
  }, [filters]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const perroId = queryParams.get('adoptar');

    if (auth.isAuthenticated && perroId) {
      setSelectedPerroId(perroId);
      setModalIsOpen(true);
      setRedirectPath(null);
    }
  }, [auth.isAuthenticated, location.search]);

  const fetchPerros = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/perros', {
        params: { ...filters, estado: [1, 5] } // Solo mostrar perros disponibles y devueltos
      });
      setPerros(response.data.perros || []);
    } catch (error) {
      console.error('Error fetching perros:', error);
    }
  };

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdoptar = (id) => {
    if (!auth.isAuthenticated) {
      setSelectedPerroId(id);
      setLoginPromptOpen(true); // Mostrar el modal de inicio de sesión
    } else {
      setSelectedPerroId(id);
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedPerroId(null);
  };

  const closeLoginPrompt = () => {
    setLoginPromptOpen(false);
    setSelectedPerroId(null);
  };

  const handleLoginRedirect = () => {
    setRedirectPath(`/perros?adoptar=${selectedPerroId}`);
    navigate('/login');
  };

  return (
    <div className="perros-container">
      <h2>Perros Disponibles</h2>
      <div className="filters">
        <label>
          Raza:
          <input type="text" name="raza" value={filters.raza} onChange={handleChange} />
        </label>
        <label>
          Edad:
          <input type="number" name="edad" value={filters.edad} onChange={handleChange} />
        </label>
        <label>
          Tamaño:
          <input type="text" name="tamano" value={filters.tamano} onChange={handleChange} />
        </label>
      </div>
      <div className="table-container">
        <table className="perros-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Raza</th>
              <th>Edad</th>
              <th>Tamaño</th>
              <th>Género</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(perros) && perros.map(perro => (
              <tr key={perro.id_perro}>
                <td>
                  {perro.imagen_url && (
                    <img
                      src={`http://localhost:3000/${perro.imagen_url.startsWith('http') ? perro.imagen_url : perro.imagen_url}`}
                      alt={perro.nombre}
                      width="100"
                    />
                  )}
                </td>
                <td>{perro.nombre}</td>
                <td>{perro.raza}</td>
                <td>{perro.edad}</td>
                <td>{perro.tamano}</td>
                <td>{perro.genero}</td>
                <td>{perro.descripcion}</td>
                <td>
                  <button onClick={() => handleAdoptar(perro.id_perro)}>Adoptar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Solicitud de Adopción"
        className="Modal"
        overlayClassName="Overlay"
      >
        <Solicitar idAdoptante={auth.id_adoptante} idPerro={selectedPerroId} closeModal={closeModal} />
      </Modal>
      <Modal
        isOpen={loginPromptOpen}
        onRequestClose={closeLoginPrompt}
        contentLabel="Iniciar Sesión"
        className="Modal"
        overlayClassName="Overlay"
      >
        <button className="close-modal-btn" onClick={closeLoginPrompt}>X</button> {/* Botón X para cerrar */}
        <h2>Por favor, inicie sesión primero</h2>
        <div className="button-container">
          <button onClick={handleLoginRedirect}>Iniciar Sesión</button>
          <button className="close-btn" onClick={closeLoginPrompt}>Cerrar</button>
        </div>
      </Modal>
    </div>
  );
};

export default Perros;
