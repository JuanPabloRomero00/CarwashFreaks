import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  const serviciosRef = useRef(null);
  const turnosRef = useRef(null);
  const contactoRef = useRef(null);


  const navigate = useNavigate();
  // Simulación de autenticación (reemplazar por lógica real)
  const isAuthenticated = false;

  // Scroll helpers para navegación interna
  const scrollTo = ref => ref.current && ref.current.scrollIntoView({ behavior: 'smooth' });

  const handleReservarHero = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      scrollTo(turnosRef);
    }
  };

  return (
    <div>
      <Header />
      <main style={{ marginTop: 60 }}>
        {/* Hero Section */}
        <section id="hero" className="hero-section">
          <div className="hero-slider">
            {/* Aquí iría el slider de imágenes, por ahora placeholder */}
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" alt="Carwash" className="hero-img" />
            <div className="hero-overlay">
              <h1>¡Tu auto como nuevo, siempre!</h1>
              <p>Servicio profesional de lavado y detailing en CarwashFreaks.</p>
              <button className="reservar-btn" onClick={handleReservarHero}>Reservar turno</button>
            </div>
          </div>
        </section>

        {/* Servicios Section */}
        <section id="servicios" ref={serviciosRef} className="servicios-section">
          <h2>Nuestros Servicios</h2>
          <div className="servicios-grid">
            <div className="servicio-card">
              <h3>Lavado Exterior</h3>
              <p>Eliminamos suciedad y polvo, dejando tu auto reluciente.</p>
            </div>
            <div className="servicio-card">
              <h3>Lavado Interior</h3>
              <p>Limpieza profunda de alfombras, asientos y paneles.</p>
            </div>
            <div className="servicio-card">
              <h3>Detailing</h3>
              <p>Tratamientos especiales para pintura, plásticos y tapizados.</p>
            </div>
            <div className="servicio-card">
              <h3>Desinfección</h3>
              <p>Sanitización profesional para tu tranquilidad y seguridad.</p>
            </div>
          </div>
        </section>

        {/* Turnos Section */}
        <section id="turnos" ref={turnosRef} className="turnos-section">
          <h2>Turnos</h2>
          <p>
            Reservá tu turno online, elegí el servicio y horario que prefieras. Podés cancelar hasta 2 horas antes del turno. Para reservar, completá el formulario y te confirmamos por email.
          </p>
        </section>

        {/* Contacto Section */}
        <section id="contacto" ref={contactoRef} className="contacto-section">
          <h2>Contacto</h2>
          <form className="contact-form">
            <div className="form-row">
              <input type="text" name="nombre" placeholder="Nombre" required />
              <input type="text" name="apellido" placeholder="Apellido" required />
            </div>
            <div className="form-row">
              <input type="email" name="email" placeholder="Email" required />
              <input type="tel" name="telefono" placeholder="Teléfono" required />
            </div>
            <textarea name="consulta" placeholder="Escribe tu consulta aquí..." rows={4} required />
            <button type="submit" className="enviar-btn">Enviar</button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
