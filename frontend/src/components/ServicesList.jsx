import React from 'react';

const ServicesList = ({ services, onSelectService }) => {
  if (!services || services.length === 0) {
    return (
      <section className="services-section">
        <h2>Servicios Disponibles</h2>
        <div className="empty-state">
          <p>No hay servicios disponibles en este momento</p>
        </div>
      </section>
    );
  }

  return (
    <section className="services-section">
      <h2>Elige tu Servicio</h2>
      <div className="services-grid">
        {services.map(service => (
          <div key={service.id} className="service-card">
            <div className="service-header">
              <h3>{service.name}</h3>
              <span className="service-duration">{service.duration} min</span>
            </div>
            
            <div className="service-content">
              <p className="service-description">{service.description}</p>
              
              <div className="service-features">
                {service.features && service.features.map((feature, index) => (
                  <span key={index} className="feature-tag">{feature}</span>
                ))}
              </div>
            </div>

            <div className="service-footer">
              <div className="service-price">
                <span className="price-label">Precio:</span>
                <span className="price-value">${service.price}</span>
              </div>
              
              <button 
                className="btn-primary"
                onClick={() => onSelectService(service)}
                disabled={!service.isActive}
              >
                {service.isActive ? 'Reservar' : 'No disponible'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesList;