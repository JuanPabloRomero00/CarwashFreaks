import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import imgHero from '../../public/img/carwash-section.png';

const Login = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <main className="login-main">
        <section className="login-section">
          <div className="login-left">
            {/* <img src={imgHero} alt="CarwashFreaks" className="login-img" /> */}
            <div className="login-logo">CarwashFreaks</div>
          </div>
          <div className="login-right">
            <form className="login-form">
              <h2>Iniciar sesión</h2>
              <input type="email" placeholder="Correo electrónico" required />
              <input type="password" placeholder="Contraseña" required />
              <button type="submit" className="login-btn-full">Iniciar sesión</button>
              <button type="button" className="register-btn" onClick={() => navigate('/register')}>Registrarse</button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
