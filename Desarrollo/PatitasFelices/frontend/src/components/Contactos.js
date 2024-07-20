import React from 'react';
import Footer from '../components/Footer';
import '../styles/Contactos.css';

const Contactos = () => {
  return (
    <div className="contactos-wrapper">
      <div className="content">
        <h1>Contactos</h1>
        
        <div className="contact-info box">
          <h2>Información de Contacto Básica</h2>
          <p><strong>Dirección:</strong> Av. Los Amores 123, Colonia Las Flores, Ciudad Esperanza, CP 45678</p>
          <p><strong>Teléfono:</strong> +593 978070835</p>
          <p><strong>Correo Electrónico:</strong> patitasfelices7@outlook.com</p>
        </div>

        <div className="contact-hours box">
          <h2>Horario de Atención</h2>
          <p>Lunes a Viernes: 9:00 AM - 5:00 PM</p>
          <p>Sábado: 10:00 AM - 2:00 PM</p>
          <p>Domingo: Cerrado</p>
        </div>

        <div className="contact-social box">
          <h2>Redes Sociales</h2>
          <a href="https://www.facebook.com/profile.php?id=100064353828410&locale=es_LA" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://www.instagram.com/adoptameecuador/?hl=es" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://twitter.com/mascotasadopcio?lang=es" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contactos;
