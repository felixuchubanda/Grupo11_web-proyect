import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inicio from './components/Inicio';
import Perros from './components/Perros';
import Contactos from './components/Contactos';
import Nosotros from './components/Nosotros';
import Recursos from './components/Recursos';
import Recomendar from './components/Recomendar';
import RecomendarVisitante from './components/RecomendarVisitante';
import Solicitar from './components/Solicitar';
import Login from './components/Login';
import Register from './components/Register';
import CrearPerro from './components/GestionarPerros/CrearPerro';
import ListarPerros from './components/GestionarPerros/ListarPerros';
import EditarPerro from './components/GestionarPerros/EditarPerro'; 
import CrearAdoptante from './components/GestionarAdoptantes/CrearAdoptante';
import ListarAdoptantes from './components/GestionarAdoptantes/ListarAdoptantes';
import EditarAdoptante from './components/GestionarAdoptantes/EditarAdoptante';
import CrearEmpleado from './components/GestionarEmpleados/CrearEmpleado';
import ListarEmpleados from './components/GestionarEmpleados/ListarEmpleados';
import EditarEmpleado from './components/GestionarEmpleados/EditarEmpleado';
import CrearSolicitud from './components/GestionarSolicitudes/CrearSolicitud';
import SolicitudesPendientes from './components/GestionarSolicitudes/SolicitudesPendientes';
import ListarSolicitudes from './components/GestionarSolicitudes/ListarSolicitudes';
import RegistrarDevolucion from './components/GestionarDevoluciones/RegistrarDevolucion';
import VerDevoluciones from './components/GestionarDevoluciones/VerDevoluciones';
import Navbar from './components/Navbar';
import AuthProvider from './AuthContext';
import RecuperarContrasena from './components/RecuperarContrasena';
import RestablecerContrasena from './components/RestablecerContrasena';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/perros" element={<Perros />} />
          <Route path="/contactos" element={<Contactos />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/recursos" element={<Recursos />} />
          <Route path="/recomendar" element={<Recomendar />} />
          <Route path="/recomendar-visitante" element={<RecomendarVisitante />} />
          <Route path="/solicitar" element={<Solicitar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/gestionar/perros/crear" element={<CrearPerro />} />
          <Route path="/gestionar/perros/listar" element={<ListarPerros />} />
          <Route path="/gestionar/perros/editar/:id" element={<EditarPerro />} /> 
          <Route path="/gestionar/adoptantes/crear" element={<CrearAdoptante />} />
          <Route path="/gestionar/adoptantes/listar" element={<ListarAdoptantes />} />
          <Route path="/gestionar/adoptantes/editar/:id" element={<EditarAdoptante />} />
          <Route path="/gestionar/empleados/crear" element={<CrearEmpleado />} />
          <Route path="/gestionar/empleados/listar" element={<ListarEmpleados />} />
          <Route path="/gestionar/empleados/editar/:id" element={<EditarEmpleado />} />
          <Route path="/gestionar/solicitudes/crear" element={<CrearSolicitud />} />
          <Route path="/gestionar/solicitudes/pendientes" element={<SolicitudesPendientes />} />
          <Route path="/gestionar/solicitudes/listar" element={<ListarSolicitudes />} />
          <Route path="/gestionar/devoluciones/registrar" element={<RegistrarDevolucion />} />
          <Route path="/gestionar/devoluciones/ver" element={<VerDevoluciones />} />
          <Route path="/recuperar-contrasena" element={<RecuperarContrasena />} />
          <Route path="/restablecer-contrasena" element={<RestablecerContrasena />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
