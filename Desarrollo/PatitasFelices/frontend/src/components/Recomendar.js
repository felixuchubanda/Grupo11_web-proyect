import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import '../styles/Recomendar.css'; // Importa el archivo CSS

const Recomendar = () => {
  const { auth } = useContext(AuthContext);
  const [numRecommendations, setNumRecommendations] = useState(1);
  const [recommendations, setRecommendations] = useState([]);
  const [adoptante, setAdoptante] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [preferences, setPreferences] = useState({
    tiene_ninos: '',
    tiene_mascota: '',
    nivel_actividad: '',
    nivel_energia: '',
    tamano_perro_preferido: '',
    experiencia_con_perros: ''
  });
  const [isAdopting, setIsAdopting] = useState(false);
  const [selectedPerro, setSelectedPerro] = useState(null);
  const [adoptionData, setAdoptionData] = useState({
    fechaSolicitud: '',
    comentario: '',
    descripcion: ''
  });

  useEffect(() => {
    const fetchAdoptante = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/adoptantes/${auth.id_adoptante}`);
        setAdoptante(response.data);
        setPreferences({
          tiene_ninos: response.data.tiene_ninos,
          tiene_mascota: response.data.tiene_mascota,
          nivel_actividad: response.data.nivel_actividad,
          nivel_energia: response.data.nivel_energia,
          tamano_perro_preferido: response.data.tamano_perro_preferido,
          experiencia_con_perros: response.data.experiencia_con_perros
        });
      } catch (error) {
        console.error('Error fetching adoptante data:', error);
      }
    };

    if (auth.id_adoptante) {
      fetchAdoptante();
    }
  }, [auth.id_adoptante]);

  const handleRecommend = async () => {
    if (!auth.isAuthenticated) {
      alert('Por favor, inicie sesión primero');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/recomendar', {
        id_adoptante: auth.id_adoptante,
        numRecommendations: parseInt(numRecommendations, 10),
      });
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPreferences({
      ...preferences,
      [name]: value
    });
  };

  const handleSavePreferences = async () => {
    try {
      await axios.put(`http://localhost:3000/api/adoptantes/${auth.id_adoptante}`, preferences);
      setIsEditing(false);
      const updatedAdoptante = { ...adoptante, ...preferences };
      setAdoptante(updatedAdoptante);
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  const handleAdoptClick = (perro) => {
    setSelectedPerro(perro);
    setIsAdopting(true);
  };

  const handleAdoptionInputChange = (e) => {
    const { name, value } = e.target;
    setAdoptionData({
      ...adoptionData,
      [name]: value
    });
  };

  const handleAdoptSubmit = async () => {
    try {
      await axios.post('http://localhost:3000/api/solicitudes-adopcion', {
        id_adoptante: auth.id_adoptante,
        id_perro: selectedPerro.id_perro,
        fechaSolicitud: adoptionData.fechaSolicitud,
        comentario: adoptionData.comentario,
        descripcion: adoptionData.descripcion,
        rechazado_por_devolucion: false
      });
      setIsAdopting(false);
      setAdoptionData({
        fechaSolicitud: '',
        comentario: '',
        descripcion: ''
      });
      alert('Solicitud de adopción enviada con éxito.');
    } catch (error) {
      alert(error.response?.data?.error || 'Error al enviar la solicitud de adopción.');
      console.error('Error submitting adoption request:', error);
    }
  };

  const handleCancelAdoption = () => {
    setIsAdopting(false);
    setAdoptionData({
      fechaSolicitud: '',
      comentario: '',
      descripcion: ''
    });
  };

  return (
    <div className="recomendar-container">
      <label htmlFor="numRecommendations">Número de Recomendaciones:</label>
      <input
        type="number"
        id="numRecommendations"
        value={numRecommendations}
        onChange={(e) => setNumRecommendations(e.target.value)}
        min="1"
        placeholder="Número de Recomendaciones"
      />
      <button onClick={handleRecommend}>Recomendar</button>

      {isEditing ? (
        <div>
          <h3>Editar Preferencias</h3>
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
          <div className="buttons-container">
            <button onClick={handleSavePreferences}>Guardar Preferencias</button>
            <button className="cancel-button" onClick={handleEditToggle}>Cancelar</button>
          </div>
        </div>
      ) : (
        <button onClick={handleEditToggle}>Editar Preferencias</button>
      )}

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
              <button onClick={() => handleAdoptClick(rec)}>Adoptar</button>
            </li>
          ))}
        </ul>
      )}

      {isAdopting && selectedPerro && (
        <div>
          <h3>Solicitud de Adopción para {selectedPerro.nombre}</h3>
          <label>
            Comentario:
            <textarea
              name="comentario"
              value={adoptionData.comentario}
              onChange={handleAdoptionInputChange}
            />
          </label>
          <label>
            Descripción:
            <textarea
              name="descripcion"
              value={adoptionData.descripcion}
              onChange={handleAdoptionInputChange}
            />
          </label>
          <div className="buttons-container">
            <button onClick={handleAdoptSubmit}>Enviar Solicitud</button>
            <button className="cancel-button" onClick={handleCancelAdoption}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recomendar;
