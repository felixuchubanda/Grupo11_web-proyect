// src/componentes/RecuperarContrasena.js
import { useState } from 'react';
import axios from 'axios';
import MessageModal from './MessageModal'; 
import '../styles/RecuperarContrasena.css'; 

const RecuperarContrasena = () => {
    const [email, setEmail] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');

    const manejarEnvio = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/usuarios/solicitar-restablecimiento-contrasena', { email });
            setMensaje(response.data.message);
            setModalType('success');
            setModalOpen(true);
        } catch (error) {
            setMensaje(error.response.data.message || 'Error al enviar la solicitud.');
            setModalType('error');
            setModalOpen(true);
        }
    };

    return (
        <div className="recuperar-container">
            <h2 className="recuperar-title">Recuperar Contraseña</h2>
            <form onSubmit={manejarEnvio} className="recuperar-form">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ingresa tu correo electrónico"
                    required
                    className="recuperar-input"
                />
                <button type="submit" className="recuperar-button">Enviar</button>
            </form>
            {mensaje && <p className="recuperar-message">{mensaje}</p>}
            <MessageModal isOpen={modalOpen} message={mensaje} onClose={() => setModalOpen(false)} type={modalType} />
        </div>
    );
};

export default RecuperarContrasena;
