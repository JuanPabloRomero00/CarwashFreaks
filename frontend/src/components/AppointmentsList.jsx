import React from 'react';

const AppointmentsList = ({ appointments }) => {
  if (!appointments || appointments.length === 0) {
    return (
      <section className="appointments-section">
        <h2>Mis Turnos</h2>
        <div className="empty-state">
          <p>No tienes turnos programados</p>
          <button className="btn-primary">Reservar primer turno</button>
        </div>
      </section>
    );
  }

  return (
    <section className="appointments-section">
      <h2>Mis Turnos</h2>
      <div className="appointments-grid">
        {appointments.map(appointment => (
          <div key={appointment.id} className="appointment-card">
            <div className="appointment-header">
              <h3>{appointment.serviceName}</h3>
              <span className={`status status-${appointment.status}`}>
                {appointment.status === 'pending' && 'Pendiente'}
                {appointment.status === 'confirmed' && 'Confirmado'}
                {appointment.status === 'cancelled' && 'Cancelado'}
                {appointment.status === 'completed' && 'Completado'}
              </span>
            </div>
            
            <div className="appointment-details">
              <div className="detail-item">
                <span className="label">Fecha:</span>
                <span className="value">{new Date(appointment.date).toLocaleDateString()}</span>
              </div>
              <div className="detail-item">
                <span className="label">Hora:</span>
                <span className="value">{appointment.time}</span>
              </div>
              <div className="detail-item">
                <span className="label">Precio:</span>
                <span className="value">${appointment.price}</span>
              </div>
              {appointment.notes && (
                <div className="detail-item">
                  <span className="label">Notas:</span>
                  <span className="value">{appointment.notes}</span>
                </div>
              )}
            </div>

            <div className="appointment-actions">
              {appointment.status === 'pending' && (
                <>
                  <button className="btn-secondary" onClick={() => handleModify(appointment.id)}>
                    Modificar
                  </button>
                  <button className="btn-danger" onClick={() => handleCancel(appointment.id)}>
                    Cancelar
                  </button>
                </>
              )}
              {appointment.status === 'confirmed' && (
                <button className="btn-danger" onClick={() => handleCancel(appointment.id)}>
                  Cancelar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Funciones placeholder - después conectar con APIs
const handleModify = (appointmentId) => {
  console.log('Modificar turno:', appointmentId);
};

const handleCancel = (appointmentId) => {
  if (confirm('¿Estás seguro de cancelar este turno?')) {
    console.log('Cancelar turno:', appointmentId);
  }
};

export default AppointmentsList;