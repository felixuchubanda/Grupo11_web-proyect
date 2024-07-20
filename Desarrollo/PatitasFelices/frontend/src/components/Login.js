import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import MessageModal from './MessageModal'; // Asegúrate de que este componente esté correctamente importado
import '../styles/Login.css'; // Estilos para el login y el modal
import welcomeImage from '../assets/logo.png'; // Ajusta la ruta según sea necesario

const Login = () => {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState(''); // 'success' para bienvenidas y 'error' para errores
  const [modalImage, setModalImage] = useState(null); // Estado para la imagen del modal
  const navigate = useNavigate();
  const { auth, login, redirectPath, setRedirectPath } = useContext(AuthContext);

  useEffect(() => {
    if (auth.isAuthenticated) {
      if (redirectPath) {
        navigate(redirectPath);
        setRedirectPath(null);
      } else {
        navigate('/'); // Redirigir al inicio si no hay redirectPath
      }
    }
  }, [auth.isAuthenticated, redirectPath, navigate, setRedirectPath]);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/usuarios/login', { email, contrasena });
      const { tipo, id_usuario } = response.data;
      setModalMessage('Bienvenido a Patitas Felices');
      setModalOpen(true);
      setModalType('welcome');
      setModalImage(welcomeImage); // Establecer la imagen del modal
      setTimeout(() => {
        setModalOpen(false);
        login(tipo, id_usuario);
      }, 2500); // Cerrar el modal automáticamente después de 2.5 segundos
    } catch (error) {
      setModalMessage('Email o contraseña incorrectos');
      setModalOpen(true);
      setModalType('error');
      setModalImage(null); // No mostrar imagen en caso de error
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <h2 className="login-title">Iniciar Sesión</h2>
        <div className="login-icon"></div>
        <input
          className="login-input"
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin}>Iniciar Sesión</button>
        <div className="register-link-container">
          <Link to="/register" className="register-link">Crear cuenta</Link>
        </div>
      </div>
      <MessageModal isOpen={modalOpen} message={modalMessage} onClose={() => setModalOpen(false)} type={modalType} image={modalImage} />
    </div>
  );
};

export default Login;
