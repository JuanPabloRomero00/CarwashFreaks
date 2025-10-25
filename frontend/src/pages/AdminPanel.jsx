import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  fetchAllUsers, 
  fetchAllAppointments, 
  fetchAllServices,
  updateUser,
  updateAppointment,
  updateService
} from '../services/api';

const AdminPanel = () => {
  const [activeView, setActiveView] = useState('users');
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Estados para modales de edición
  const [editModal, setEditModal] = useState({ show: false, type: '', data: null });
  const [editForm, setEditForm] = useState({});
  const [updating, setUpdating] = useState(false);
  
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Verificar que el usuario sea admin
  useEffect(() => {
    if (!isAuthenticated || !user || user.role !== 'admin') {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  // Función para obtener usuarios
  const fetchUsersData = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener turnos
  const fetchAppointmentsData = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchAllAppointments();
      setAppointments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener servicios
  const fetchServicesData = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchAllServices();
      setServices(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos según la vista activa
  useEffect(() => {
    switch (activeView) {
      case 'users':
        fetchUsersData();
        break;
      case 'appointments':
        fetchAppointmentsData();
        break;
      case 'services':
        fetchServicesData();
        break;
      default:
        break;
    }
  }, [activeView]);

  // Funciones para manejar edición
  const openEditModal = (type, data) => {
    setEditModal({ show: true, type, data });
    setEditForm({ ...data });
  };

  const closeEditModal = () => {
    setEditModal({ show: false, type: '', data: null });
    setEditForm({});
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError('');

    try {
      const { type, data } = editModal;
      
      switch (type) {
        case 'user':
          await updateUser(data._id, editForm);
          await fetchUsersData();
          break;
        case 'appointment':
          await updateAppointment(data._id, editForm);
          await fetchAppointmentsData();
          break;
        case 'service':
          await updateService(data._id, editForm);
          await fetchServicesData();
          break;
      }
      
      closeEditModal();
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleFormChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  // Componente para mostrar usuarios
  const UsersView = () => (
    <div className="admin-table-container">
      <h3>Usuarios Registrados</h3>
      {users.length === 0 ? (
        <p>No hay usuarios registrados</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Rol</th>
              <th>Fecha Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.nombre} {user.apellido}</td>
                <td>{user.email}</td>
                <td>{user.telefono}</td>
                <td>
                  <span className={`role-badge ${user.role}`}>
                    {user.role === 'admin' ? 'Admin' : 'Usuario'}
                  </span>
                </td>
                <td>{new Date(user.timestamp).toLocaleDateString()}</td>
                <td>
                  <button 
                    className="edit-btn"
                    onClick={() => openEditModal('user', user)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  // Componente para mostrar turnos
  const AppointmentsView = () => (
    <div className="admin-table-container">
      <h3>Turnos Programados</h3>
      {appointments.length === 0 ? (
        <p>No hay turnos programados</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Servicio</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Estado</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              <tr key={appointment._id}>
                <td>{appointment.user?.nombre} {appointment.user?.apellido}</td>
                <td>{appointment.service?.name}</td>
                <td>{new Date(appointment.date).toLocaleDateString()}</td>
                <td>{appointment.time}</td>
                <td>
                  <span className={`status-badge ${appointment.status}`}>
                    {appointment.status}
                  </span>
                </td>
                <td>${appointment.service?.price}</td>
                <td>
                  <button 
                    className="edit-btn"
                    onClick={() => openEditModal('appointment', appointment)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  // Componente para mostrar servicios
  const ServicesView = () => (
    <div className="admin-table-container">
      <h3>Servicios Disponibles</h3>
      {services.length === 0 ? (
        <p>No hay servicios disponibles</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Duración</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service._id}>
                <td>{service.name}</td>
                <td>{service.description}</td>
                <td>${service.price}</td>
                <td>{service.duration} min</td>
                <td>
                  <span className={`status-badge ${service.isActive ? 'active' : 'inactive'}`}>
                    {service.isActive ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td>
                  <button 
                    className="edit-btn"
                    onClick={() => openEditModal('service', service)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  if (!isAuthenticated || !user || user.role !== 'admin') {
    return null;
  }

  return (
    <>
      <Header />
      <div className="admin-panel">
        <div className="admin-header">
          <h1>Panel de Administración</h1>
          <p>Bienvenido, {user.nombre} {user.apellido}</p>
        </div>

      <div className="admin-navigation">
        <button 
          className={`admin-nav-btn ${activeView === 'users' ? 'active' : ''}`}
          onClick={() => setActiveView('users')}
        >
          Usuarios ({users.length})
        </button>
        <button 
          className={`admin-nav-btn ${activeView === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveView('appointments')}
        >
          Turnos ({appointments.length})
        </button>
        <button 
          className={`admin-nav-btn ${activeView === 'services' ? 'active' : ''}`}
          onClick={() => setActiveView('services')}
        >
          Servicios ({services.length})
        </button>
      </div>

      <div className="admin-content">
        {loading && (
          <div className="admin-loading">
            <div className="loading-spinner"></div>
            <p>Cargando...</p>
          </div>
        )}

        {error && (
          <div className="admin-error">
            <p>Error: {error}</p>
            <button onClick={() => window.location.reload()}>Reintentar</button>
          </div>
        )}

        {!loading && !error && (
          <>
            {activeView === 'users' && <UsersView />}
            {activeView === 'appointments' && <AppointmentsView />}
            {activeView === 'services' && <ServicesView />}
          </>
        )}
      </div>

      {/* Modal de Edición */}
      {editModal.show && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Editar {editModal.type === 'user' ? 'Usuario' : editModal.type === 'appointment' ? 'Turno' : 'Servicio'}</h3>
              <button className="modal-close" onClick={closeEditModal}>×</button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="edit-form">
              {editModal.type === 'user' && (
                <>
                  <div className="form-group">
                    <label>Nombre:</label>
                    <input
                      type="text"
                      value={editForm.nombre || ''}
                      onChange={(e) => handleFormChange('nombre', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Apellido:</label>
                    <input
                      type="text"
                      value={editForm.apellido || ''}
                      onChange={(e) => handleFormChange('apellido', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      value={editForm.email || ''}
                      onChange={(e) => handleFormChange('email', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Teléfono:</label>
                    <input
                      type="text"
                      value={editForm.telefono || ''}
                      onChange={(e) => handleFormChange('telefono', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Rol:</label>
                    <select
                      value={editForm.role || 'user'}
                      onChange={(e) => handleFormChange('role', e.target.value)}
                    >
                      <option value="user">Usuario</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </>
              )}

              {editModal.type === 'appointment' && (
                <>
                  <div className="form-group">
                    <label>Fecha:</label>
                    <input
                      type="date"
                      value={editForm.date ? new Date(editForm.date).toISOString().split('T')[0] : ''}
                      onChange={(e) => handleFormChange('date', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Hora:</label>
                    <input
                      type="time"
                      value={editForm.time || ''}
                      onChange={(e) => handleFormChange('time', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Estado:</label>
                    <select
                      value={editForm.status || 'pending'}
                      onChange={(e) => handleFormChange('status', e.target.value)}
                    >
                      <option value="pending">Pendiente</option>
                      <option value="confirmed">Confirmado</option>
                      <option value="cancelled">Cancelado</option>
                      <option value="completed">Completado</option>
                    </select>
                  </div>
                </>
              )}

              {editModal.type === 'service' && (
                <>
                  <div className="form-group">
                    <label>Nombre:</label>
                    <input
                      type="text"
                      value={editForm.name || ''}
                      onChange={(e) => handleFormChange('name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Descripción:</label>
                    <textarea
                      value={editForm.description || ''}
                      onChange={(e) => handleFormChange('description', e.target.value)}
                      required
                      rows="3"
                    />
                  </div>
                  <div className="form-group">
                    <label>Precio:</label>
                    <input
                      type="number"
                      value={editForm.price || ''}
                      onChange={(e) => handleFormChange('price', parseInt(e.target.value))}
                      required
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label>Duración (minutos):</label>
                    <input
                      type="number"
                      value={editForm.duration || ''}
                      onChange={(e) => handleFormChange('duration', parseInt(e.target.value))}
                      required
                      min="1"
                    />
                  </div>
                  <div className="form-group">
                    <label>Estado:</label>
                    <select
                      value={editForm.isActive !== undefined ? editForm.isActive : true}
                      onChange={(e) => handleFormChange('isActive', e.target.value === 'true')}
                    >
                      <option value="true">Activo</option>
                      <option value="false">Inactivo</option>
                    </select>
                  </div>
                </>
              )}

              {error && <div className="error-message">{error}</div>}

              <div className="modal-actions">
                <button type="button" onClick={closeEditModal} className="btn-cancel">
                  Cancelar
                </button>
                <button type="submit" disabled={updating} className="btn-save">
                  {updating ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
      <Footer />
    </>
  );
};

export default AdminPanel;