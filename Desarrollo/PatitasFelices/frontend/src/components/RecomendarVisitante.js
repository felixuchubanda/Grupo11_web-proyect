import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Recomendar.css'; // Importa el archivo CSS

const RecomendarVisitante = () => {
  const [numRecommendations, setNumRecommendations] = useState(1);
  const [preferences, setPreferences] = useState({
    tiene_ninos: '',
    tiene_mascota: '',
    nivel_actividad: '',
    nivel_energia: '',
    tamano_perro_preferido: '',
    experiencia_con_perros: ''
  });
  const [recommendations, setRecommendations] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPreferences({
      ...preferences,
      [name]: value
    });
  };

  const handleRecommend = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/recomendar-visitante', {
        preferences,
        numRecommendations: parseInt(numRecommendations, 10),
      });
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div className="recomendar-container">
      <h1>Recomendar un Perro </h1>
      <div>
        <label>
          Tiene niños:
          <select name="tiene_ninos" value={preferences.tiene_ninos} onChange={handleInputChange}>
            <option value="">Seleccione</option>
            <option value="SI">Sí</option>
            <option value="NO">No</option>
          </select>
        </label>
        <label>
          Tiene mascota:
          <select name="tiene_mascota" value={preferences.tiene_mascota} onChange={handleInputChange}>
            <option value="">Seleccione</option>
            <option value="SI">Sí</option>
            <option value="NO">No</option>
          </select>
        </label>
        <label>
          Nivel de actividad:
          <select name="nivel_actividad" value={preferences.nivel_actividad} onChange={handleInputChange}>
            <option value="">Seleccione</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <label>
          Nivel de energía:
          <select name="nivel_energia" value={preferences.nivel_energia} onChange={handleInputChange}>
            <option value="">Seleccione</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <label>
          Tamaño del perro preferido:
          <select name="tamano_perro_preferido" value={preferences.tamano_perro_preferido} onChange={handleInputChange}>
            <option value="">Seleccione</option>
            <option value="PEQUEÑO">Pequeño</option>
            <option value="MEDIANO">Mediano</option>
            <option value="GRANDE">Grande</option>
          </select>
        </label>
        <label>
          Experiencia con perros:
          <select name="experiencia_con_perros" value={preferences.experiencia_con_perros} onChange={handleInputChange}>
            <option value="">Seleccione</option>
            <option value="PRINCIPIANTE">Principiante</option>
            <option value="INTERMEDIO">Intermedio</option>
            <option value="EXPERTO">Experto</option>
          </select>
        </label>
        <input
          type="number"
          value={numRecommendations}
          onChange={(e) => setNumRecommendations(e.target.value)}
          min="1"
          placeholder="Número de Recomendaciones"
        />
        <button className="recomendar-button" onClick={handleRecommend}>Recomendar</button>
      </div>

      {recommendations.length > 0 && (
        <ul>
          {recommendations.map((rec, index) => (
            <li key={index}>
              <img src={rec.imagen_url} alt={rec.nombre} />
              <p>Nombre: {rec.nombre}</p>
              <p>Edad: {rec.edad}</p>
              <p>Raza: {rec.raza}</p>
              <p>Tamaño: {rec.tamano}</p>
              <p>Género: {rec.genero}</p>
              <p>Puntaje de Similitud: {rec.puntaje_similitud}</p>
              <div className="similarity-bar-container">
                <div className="similarity-bar" style={{ width: `${rec.puntaje_similitud * 100}%` }}></div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecomendarVisitante;
