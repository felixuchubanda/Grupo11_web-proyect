import React from 'react';
import '../styles/MessageModal.css'; // Asegúrate de ajustar la ruta según la ubicación de tu archivo CSS

const MessageModal = ({ isOpen, message, onClose, type, image }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className={`modal-content ${type === 'error' ? 'modal-error' : type === 'welcome' ? 'modal-welcome' : 'modal-success'}`}>
        {image && <img src={image} alt="Modal" className="modal-image" />}
        <p>{message}</p>
        {type !== 'welcome' && (
          <button onClick={onClose}>Cerrar</button>
        )}
      </div>
    </div>
  );
};

export default MessageModal;
