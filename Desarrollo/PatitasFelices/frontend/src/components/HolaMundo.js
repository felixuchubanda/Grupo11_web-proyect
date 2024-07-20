// src/components/HolaMundo.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HolaMundo = () => {
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    axios.get('/api/hola')
      .then(respuesta => {
        setMensaje(respuesta.data.mensaje);
      })
      .catch(error => {
        console.error('Hubo un error al obtener el mensaje!', error);
      });
  }, []);

  return (
    <div>
      <h1>{mensaje}</h1>
    </div>
  );
};

export default HolaMundo;
