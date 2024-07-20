// src/componentes/RestablecerContrasena.js
import { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import MessageModal from './MessageModal'; 
import '../styles/RestablecerContrasena.css'; 

const RestablecerContrasena = () => {
    const [nuevaContrasena, setNuevaContrasena] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(''); 
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    const manejarEnvio = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/usuarios/restablecer-contrasena', { token, nuevaContrasena });
            setMensaje(response.data.message);
            setModalType('success');
            setModalOpen(true);
            setTimeout(() => {
                setModalOpen(false);
                navigate('/login');
            }, 2500); 
        } catch (error) {
            setMensaje(error.response.data.message || 'Error al restablecer la contraseña.');
            setModalType('error');
            setModalOpen(true);
        }
    };

    return (
        <div className="restablecer-container">
            <h2 className="restablecer-title">Restablecer Contraseña</h2>
            <form onSubmit={manejarEnvio} className="restablecer-form">
                <input
                    type="password"
                    value={nuevaContrasena}
                    onChange={(e) => setNuevaContrasena(e.target.value)}
                    placeholder="Ingresa tu nueva contraseña"
                    required
                    className="restablecer-input"
                />
                <button type="submit" className="restablecer-button">Restablecer</button>
            </form>
            {mensaje && <p className="restablecer-message">{mensaje}</p>}
            <MessageModal isOpen={modalOpen} message={mensaje} onClose={() => setModalOpen(false)} type={modalType} />
        </div>
    );
};

export default RestablecerContrasena;
