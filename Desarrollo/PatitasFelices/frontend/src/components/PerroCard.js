// src/components/PerroCard.js
import React from 'react';

const PerroCard = ({ perro }) => {
  return (
    <div>
      <img src={`http://localhost:3000/uploads/${1720997572003-bella.jpeg}`} alt={perro.nombre} />
      <h2>{perro.nombre}</h2>
      <p>{perro.descripcion}</p>
    </div>
  );
};

export default PerroCard;
