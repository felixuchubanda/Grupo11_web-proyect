import React, { useEffect, useState, useCallback, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Inicio.css';
import Footer from '../components/Footer';
import { AuthContext } from '../AuthContext';

const Inicio = () => {
  const { auth } = useContext(AuthContext);
  const [dogs, setDogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showSolicitudModal, setShowSolicitudModal] = useState(false); // Modal para completar solicitud
  const navigate = useNavigate();

  const fetchPerros = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/perros', {
        params: { estado: [1, 5] } // Solo mostrar perros disponibles y devueltos
      });
      setDogs(response.data.perros || []);
    } catch (error) {
      console.error('Error fetching perros:', error);
    }
  }, []);

  const handleSolicitud = () => {
    if (auth.isAuthenticated) {
      setShowSolicitudModal(true); // Muestra el modal para completar la solicitud
    } else {
      setShowModal(true); // Muestra el modal para redirigir al login
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setShowSolicitudModal(false); // Cierra el modal de solicitud
  };

  useEffect(() => {
    fetchPerros();
  }, [fetchPerros]);

  return (
    <div className="inicio-container">
      <header className="hero">
        <h1>ADOPTA, SALVA UNA VIDA, GANA UN AMIGO</h1>
        <p>Plataforma para la adopción de perros.</p>
        <div className="hero-buttons">
          <button className="solicitud-button" onClick={() => navigate('/perros')}>QUIERO ADOPTAR</button>
        </div>
      </header>
      <section className="dogs-gallery">
        {dogs.length > 0 ? (
          dogs.slice(0, 6).map(dog => (
            <div className="dog-card" key={dog.id_perro}>
              <img
                src={`http://localhost:3000/${dog.imagen_url.startsWith('http') ? dog.imagen_url : dog.imagen_url}`}
                alt={dog.nombre}
                width="100"
              />
              <div className="dog-card-info">
                <h3>{dog.nombre}</h3>
                <p><strong>Género:</strong> {dog.genero}</p>
                <p><strong>Edad:</strong> {dog.edad} años</p>
                <p><strong>Raza:</strong> {dog.raza}</p>
                <p><strong>Tamaño:</strong> {dog.tamano} kgs</p>
                <button className="solicitud-button" onClick={handleSolicitud}>Enviar Solicitud</button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay perros disponibles en este momento.</p>
        )}
      </section>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <h2>Inicie sesión para poder adoptar</h2>
            <p>Para enviar una solicitud de adopción, por favor <br></br><Link to="/login">inicie sesión</Link>.</p>
          </div>
        </div>
      )}
      {showSolicitudModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <h2>Complete su Solicitud</h2>
            <p><Link to="/solicitud">Haga clic aquí para completar su solicitud</Link>.</p>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Inicio;
