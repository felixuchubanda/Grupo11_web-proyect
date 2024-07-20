import React from 'react';
import Footer from '../components/Footer';
import '../styles/Nosotros.css'; // Archivo CSS para estilos específicos de Nosotros

const Nosotros = () => {
  return (
    <div className="nosotros-wrapper">
      <div className="content">
        <h1>Sobre Nosotros</h1>
        <p>
          En el albergue Patitas Felices nos dedicamos a proporcionar cuidado, refugio y amor a animales
          abandonados. Nuestro objetivo es encontrar hogares amorosos para cada uno de nuestros peludos
          amigos. Con una pasión por los animales y el compromiso con su bienestar, trabajamos para asegurar
          que cada mascota tenga una segunda oportunidad en la vida.
        </p>
        <p>
          Contamos con instalaciones adecuadas, personal capacitado y un equipo voluntario comprometido que
          trabaja incansablemente para mejorar la calidad de vida de los animales que llegan a nuestro albergue.
          Juntos, hacemos posible que más animales encuentren el cariño y la protección que tanto merecen.
        </p>
        <h2>Nuestra Misión</h2>
        <p>
          Nuestra misión es ser un refugio seguro y amoroso para todos los animales que nos necesiten,
          promoviendo la adopción responsable y educando a la comunidad sobre la importancia del cuidado
          animal y el respeto hacia todas las formas de vida.
        </p>
        <h2>Colabora con Nosotros</h2>
        <p>
          Si compartes nuestra pasión por los animales y quieres ayudar, considera convertirte en voluntario,
          hacer una donación o compartir nuestra causa en tus redes sociales. ¡Tu apoyo hace la diferencia!
        </p>
        <h2>Eventos y Actividades</h2>
        <p>
          Mantente informado sobre nuestros eventos y actividades para apoyar a Patitas Felices. Desde jornadas
          de adopción hasta campañas de vacunación, ¡hay muchas formas de participar y ayudar!
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Nosotros;
