// src/components/Recursos.js
import React from 'react';
import '../styles/Recursos.css';

const consejos = [
  {
    titulo: 'Alimentación',
    contenido: 'Una dieta balanceada es esencial para la salud de tu perro. Asegúrate de darle alimentos de alta calidad y consulta a tu veterinario para recomendaciones específicas.',
    imagen: 'alimentacion'
  },
  {
    titulo: 'Ejercicio',
    contenido: 'El ejercicio regular es crucial para mantener a tu perro en forma y feliz. Paseos diarios y juegos activos son una excelente manera de mantener su bienestar.',
    imagen: 'ejercicio'
  },
  {
    titulo: 'Visitas al Veterinario',
    contenido: 'Las visitas regulares al veterinario son importantes para prevenir enfermedades y mantener la salud de tu perro. No olvides las vacunas y los chequeos periódicos.',
    imagen: 'veterinario'
  },
  {
    titulo: 'Higiene',
    contenido: 'Mantener una buena higiene es esencial para la salud de tu perro. Cepilla su pelaje regularmente y asegúrate de limpiar sus dientes y oídos.',
    imagen: 'higiene'
  }
];

const Recursos = () => {
  return (
    <div className="recursos-container">
      <h1 className="titulo-principal">Recursos para el Cuidado de Perros</h1>
      {consejos.map((consejo, index) => (
        <div className="consejo" key={index}>
          <div className={`imagen ${consejo.imagen}`}></div>
          <div className="texto">
            <h2>{consejo.titulo}</h2>
            <p>{consejo.contenido}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recursos;
