import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/EditarEmpleado.css'; // Asegúrate de importar el archivo CSS

const EditarPerro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    imagen_url: '',
    edad: '',
    raza: 'PEQUEÑO',
    tamano: '',
    genero: 'Macho',
    descripcion: '',
    nivel_energia: '',
    bueno_con_ninos: 'Si',
    bueno_con_mascota: 'Si',
    nivel_formacion: 'BAJO',
    id_estado: 1
  });
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchPerro = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/perros/${id}`);
        setForm(response.data);
      } catch (error) {
        console.error('Error fetching perro:', error);
      }
    };

    fetchPerro();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const validateForm = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(form.nombre) || form.nombre.length < 3) {
      newErrors.nombre = 'El nombre solo debe contener letras y debe tener al menos 3 caracteres.';
    }
    if (!form.edad || form.edad < 1 || form.edad > 15) {
      newErrors.edad = 'La edad del perro debe estar entre 1 y 15 años.';
    }
    if (!form.tamano) {
      newErrors.tamano = 'El tamaño es obligatorio.';
    }
    if (!form.descripcion) {
      newErrors.descripcion = 'La descripción es obligatoria.';
    }
    if (!form.nivel_energia || form.nivel_energia < 1 || form.nivel_energia > 5) {
      newErrors.nivel_energia = 'El nivel de energía debe estar entre 1 y 5.';
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
      let imageUrl = form.imagen_url;

      if (image) {
        const formData = new FormData();
        formData.append('image', image);

        const uploadResponse = await axios.post('http://localhost:3000/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        imageUrl = uploadResponse.data.imageUrl;
      }

      const perroData = {
        ...form,
        imagen_url: imageUrl
      };

      await axios.put(`http://localhost:3000/api/perros/${id}`, perroData);
      navigate('/gestionar/perros/listar');
    } catch (error) {
      console.error('Error updating perro:', error.response ? error.response.data : error.message);
    }
  };

  const handleCancel = () => {
    navigate('/gestionar/perros/listar');
  };

  return (
    <div className="editar-empleado-container">
      <h2>Editar Perro</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" name="nombre" value={form.nombre} onChange={handleInputChange} />
          {errors.nombre && <p className="error">{errors.nombre}</p>}
        </div>
        <div className="form-group">
          <label>URL de Imagen</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {errors.imagen_url && <p className="error">{errors.imagen_url}</p>}
        </div>
        <div className="form-group">
          <label>Edad</label>
          <input type="number" name="edad" value={form.edad} onChange={handleInputChange} />
          {errors.edad && <p className="error">{errors.edad}</p>}
        </div>
        <div className="form-group">
          <label>Raza</label>
          <select name="raza" value={form.raza} onChange={handleInputChange}>
            <option value="PEQUEÑO">Pequeño</option>
            <option value="MEDIANO">Mediano</option>
            <option value="GRANDE">Grande</option>
            <option value="GIGANTE">Gigante</option>
          </select>
        </div>
        <div className="form-group">
          <label>Tamaño</label>
          <input type="number" name="tamano" value={form.tamano} onChange={handleInputChange} />
          {errors.tamano && <p className="error">{errors.tamano}</p>}
        </div>
        <div className="form-group">
          <label>Género</label>
          <select name="genero" value={form.genero} onChange={handleInputChange}>
            <option value="Macho">Macho</option>
            <option value="Hembra">Hembra</option>
          </select>
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <textarea name="descripcion" value={form.descripcion} onChange={handleInputChange}></textarea>
          {errors.descripcion && <p className="error">{errors.descripcion}</p>}
        </div>
        <div className="form-group">
          <label>Nivel de Energía</label>
          <input type="number" name="nivel_energia" value={form.nivel_energia} onChange={handleInputChange} />
          {errors.nivel_energia && <p className="error">{errors.nivel_energia}</p>}
        </div>
        <div className="form-group">
          <label>Bueno con Niños</label>
          <select name="bueno_con_ninos" value={form.bueno_con_ninos} onChange={handleInputChange}>
            <option value="Si">Si</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form-group">
          <label>Bueno con Mascotas</label>
          <select name="bueno_con_mascota" value={form.bueno_con_mascota} onChange={handleInputChange}>
            <option value="Si">Si</option>
            <option value="No">No</option>
          </select>
        </div>
        <div className="form-group">
          <label>Nivel de Formación</label>
          <select name="nivel_formacion" value={form.nivel_formacion} onChange={handleInputChange}>
            <option value="BAJO">Bajo</option>
            <option value="MEDIO">Medio</option>
            <option value="ALTO">Alto</option>
          </select>
        </div>
        <div className="form-buttons">
          <button type="submit" className="save-btn">Guardar</button>
          <button type="button" className="cancel-btn" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default EditarPerro;
