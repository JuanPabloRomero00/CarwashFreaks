import React, { useRef } from "react";
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Services from "../components/Services";

const Home = () => {
  const serviciosRef = useRef(null);
  const turnosRef = useRef(null);
  const contactoRef = useRef(null);

  const navigate = useNavigate();

  // Autenticación centralizada
  const { isAuthenticated } = useAuth();

  //navegación interna
  const scrollTo = (ref) =>
    ref.current && ref.current.scrollIntoView({ behavior: "smooth" });

  const handleReservarHero = () => {
  if (!isAuthenticated) {
    localStorage.setItem('loginRedirect', '/user-appointments');
    navigate('/login');
  } else {
    navigate('/user-appointments');
  }
};

  return (
    <div>
      <Header />
      <main style={{ marginTop: 60 }}>
        <section id="hero" className="hero-section">
          <div className="hero-slider">
            <img
              src="/img/carwash-section.png"
              alt="Carwash"
              className="hero-img"
            />
            <div className="hero-overlay">
              <h1>¡Tu auto como nuevo, siempre!</h1>
              <p>
                Servicio profesional de lavado y detailing en CarwashFreaks.
              </p>
              <button className="reservar-btn" onClick={handleReservarHero}>
                Reservar turno
              </button>
            </div>
          </div>
        </section>

        <section
          id="servicios"
          ref={serviciosRef}
          className="servicios-section"
        >
          <Services />
        </section>

        <section id="turnos" ref={turnosRef} className="turnos-section">
          <h2>Turnos</h2>
          <p className="intro">
            Reservá tu turno online, elegí el servicio y horario que prefieras.
            Podés cancelar hasta 2 horas antes del turno. Para reservar,
            completá el formulario y te confirmamos por email.
          </p>

          <div className="steps-container">
            <div className="step">
              <div className="step-icn">📝</div>
              <h3>1. Elegi tu servicio</h3>
              <p>
                Selecciona el tipo de lavado o tratamiento que necesitas segun
                tus preferencias.
              </p>
            </div>

            <div className="step">
              <div className="step-icon">⏰</div>
              <h3>2. Seleccioná día y horario</h3>
              <p>
                Elegí el horario disponible que te quede más cómodo. Podés
                cancelar o reprogramar hasta 2 horas antes del turno.
              </p>
            </div>

            <div className="step">
              <div className="step-icon">📧</div>
              <h3>3. Confirmación por email</h3>
              <p>
                Una vez que completes el formulario, recibirás un correo con los
                datos de tu reserva y recordatorios automáticos.
              </p>
            </div>
          </div>
        </section>

        <section id="contacto" ref={contactoRef} className="contacto-section">
          <h2>Contacto</h2>
          <form className="contact-form">
            <div className="form-row">
              <input type="text" name="nombre" placeholder="Nombre" required />
              <input
                type="text"
                name="apellido"
                placeholder="Apellido"
                required
              />
            </div>
            <div className="form-row">
              <input type="email" name="email" placeholder="Email" required />
              <input
                type="tel"
                name="telefono"
                placeholder="Teléfono"
                required
              />
            </div>
            <textarea
              name="consulta"
              placeholder="Escribe tu consulta aquí..."
              rows={4}
              required
            />
            <button type="submit" className="enviar-btn">
              Enviar
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
