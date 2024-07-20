import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/CrearSolicitud.css'; // Importar el archivo CSS personalizado

const CrearSolicitud = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    id_perro: '',
    id_adoptante: '',
    comentario: '',
    descripcion: '',
  });
  const [perros, setPerros] = useState([]);
  const [adoptantes, setAdoptantes] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchPerros = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/perros', {
          params: { estado: [1, 5] }
        });
        setPerros(response.data.perros || []);
      } catch (error) {
        console.error('Error fetching perros:', error);
      }
    };

    const fetchAdoptantes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/adoptantes');
        console.log('Adoptantes response:', response.data); // Verifica la respuesta del servidor
        setAdoptantes(response.data.adoptantes || []); // Ajusta para acceder al array de adoptantes
      } catch (error) {
        console.error('Error fetching adoptantes:', error);
      }
    };

    fetchPerros();
    fetchAdoptantes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.id_perro) {
      newErrors.id_perro = 'El perro es obligatorio.';
    }
    if (!form.id_adoptante) {
      newErrors.id_adoptante = 'El adoptante es obligatorio.';
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
      navigate('/gestionar/solicitudes/listar'); // Redirigir a la página de listar solicitudes
    } catch (error) {
      console.error('Error saving solicitud:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="crear-solicitud-container">
      <h2>Crear Solicitud</h2>
      <form className="crear-solicitud-form" onSubmit={handleSubmit}>
        <div>
          <label>Perro</label>
          <select name="id_perro" value={form.id_perro} onChange={handleInputChange}>
            <option value="">Seleccione un perro</option>
            {Array.isArray(perros) && perros.map(perro => (
              <option key={perro.id_perro} value={perro.id_perro}>{perro.nombre}</option>
            ))}
          </select>
          {errors.id_perro && <p>{errors.id_perro}</p>}
        </div>
        <div>
          <label>Adoptante</label>
          <select name="id_adoptante" value={form.id_adoptante} onChange={handleInputChange}>
            <option value="">Seleccione un adoptante</option>
            {Array.isArray(adoptantes) && adoptantes.map(adoptante => (
              <option key={adoptante.id_adoptante} value={adoptante.id_adoptante}>{adoptante.nombre} {adoptante.apellido}</option>
            ))}
          </select>
          {errors.id_adoptante && <p>{errors.id_adoptante}</p>}
        </div>
        <div>
          <label>Comentario</label>
          <input type="text" name="comentario" value={form.comentario} onChange={handleInputChange} />
        </div>
        <div>
          <label>Descripción</label>
          <input type="text" name="descripcion" value={form.descripcion} onChange={handleInputChange} />
        </div>
        <div className="button-group">
          <button type="submit">Guardar</button>
          <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>Cancelar</button> {/* Botón de cancelar */}
        </div>
      </form>
    </div>
  );
};

export default CrearSolicitud;
