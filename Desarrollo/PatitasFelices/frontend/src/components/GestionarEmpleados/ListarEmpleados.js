import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/ListarEmpleados.css';

const ListarEmpleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/usuarios', {
          params: { tipo: 'empleado' }
        });
        setEmpleados(response.data || []);
      } catch (error) {
        console.error('Error fetching empleados:', error);
      }
    };

    fetchEmpleados();
  }, []);

  const handleEdit = (id) => {
    navigate(`/gestionar/empleados/editar/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/usuarios/${id}`);
      setEmpleados(empleados.filter(empleado => empleado.id_usuario !== id));
    } catch (error) {
      console.error('Error deleting empleado:', error);
    }
  };

  return (
    <div className="listar-empleados-container">
      <h2>Lista de Empleados</h2>
      <button className="crear-nuevo-btn" onClick={() => navigate('/gestionar/empleados/crear')}>Crear Nuevo</button>
      <table className="empleados-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.length > 0 ? (
            empleados.map((empleado) => (
              <tr key={empleado.id_usuario}>
                <td>{empleado.nombre}</td>
                <td>{empleado.apellido}</td>
                <td>{empleado.email}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(empleado.id_usuario)}>Editar</button>
                  <button className="delete-btn" onClick={() => handleDelete(empleado.id_usuario)}>Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay empleados registrados.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListarEmpleados;

