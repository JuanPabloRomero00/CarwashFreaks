import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <main className="login-main">
        <section className="login-section">
          <div className="login-left">
            <img src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80" alt="CarwashFreaks" className="login-img" />
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
