import React, { useState } from 'react';
import axios from 'axios';
import MessageModal from './MessageModal';
import '../styles/Perros.css';

const Solicitar = ({ idAdoptante, idPerro, closeModal }) => {
  const [form, setForm] = useState({
    id_perro: idPerro || '',
    id_adoptante: idAdoptante,
    comentario: '',
    descripcion: '',
    estado: 'pendiente',
    rechazado_por_devolucion: false,
  });
  const [errors, setErrors] = useState({});
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [message, setMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!form.id_perro) {
      newErrors.id_perro = 'El perro es obligatorio.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/solicitudes-adopcion', form);
      setMessage('Solicitud enviada correctamente');
      setMessageModalOpen(true); // Abre el modal con el mensaje
    } catch (error) {
      console.error('Error al enviar la solicitud:', error.response ? error.response.data : error.message);
      if (error.response) {
        setErrors({ server: error.response.data.message });
      }
    }
  };

  const closeMessageModal = () => {
    setMessageModalOpen(false);
    closeModal(); // Cierra ambos modales si es necesario
  };

  return (
    <div className="solicitar-modal">
      <h2>Solicitar Adopción</h2>
      {errors.server && <p className="error-message">{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Motivo</label>
          <textarea
            value={form.comentario}
            onChange={(e) => setForm({ ...form, comentario: e.target.value })}
            rows="3"
            style={{ resize: 'vertical' }}
          />
        </div>
        <div>
          <label>Compromiso</label>
          <textarea
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            rows="3"
            style={{ resize: 'vertical' }}
          />
        </div>
        <div className="button-container">
          <button type="submit" className="submit-btn">Enviar Solicitud</button>
          <button type="button" className="close-btn" onClick={closeModal}>Cerrar</button>
        </div>
      </form>
      <MessageModal isOpen={messageModalOpen} message={message} onClose={closeMessageModal} />
    </div>
  );
};

export default Solicitar;
