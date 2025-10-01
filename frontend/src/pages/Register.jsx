import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <main className="login-main">
        <div className="login-left">
          <div className="login-logo">CarwashFreaks</div>
        </div>

        <div className="login-right">
            <form className="login-form">
              <h2>Registrarse</h2>
              <input type="text" placeholder="Nombre" required />
              <input type="text" placeholder="Apellido" required />
              <input type="email" placeholder="Correo electrónico" required />
              <input type="tel" placeholder="Teléfono" required />
              <input type="password" placeholder="Contraseña" required />
              <button type="submit" className="login-btn-full">Registrarse</button>
              <button type="button" className="register-btn" onClick={() => navigate('/login')}>Iniciar sesión</button>
            </form>
          </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
