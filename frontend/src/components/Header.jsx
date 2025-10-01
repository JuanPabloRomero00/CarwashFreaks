
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Navegación pública (siempre visible)
const publicNavItems = [
  { label: 'Inicio', scrollTo: 'hero', isScroll: true },
  { label: 'Servicios', scrollTo: 'servicios', isScroll: true },
  { label: 'Contacto', scrollTo: 'contacto', isScroll: true },
];

// Navegación para usuarios NO autenticados
const guestNavItems = [
  { label: 'Login', to: '/login', isScroll: false },
  { label: 'Registrarse', to: '/register', isScroll: false },
];

// Navegación para usuarios autenticados
const authNavItems = [
  { label: 'Turnos', to: '/dashboard', isScroll: false },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Simulación de autenticación (reemplazar por lógica real)
  // Cambia esto a 'true' para probar la UI de usuario autenticado
  const isAuthenticated = false;

  // Obtener items de navegación según estado de autenticación
  const getNavItems = () => {
    const items = [...publicNavItems];
    if (isAuthenticated) {
      items.push(...authNavItems);
    } else {
      items.push(...guestNavItems);
    }
    return items;
  };

  // Función para scroll suave a secciones
  const scrollToSection = (sectionId) => {
    // Si no estamos en home, navegar primero
    if (location.pathname !== '/') {
      navigate('/');
      // Pequeño delay para que la página cargue antes del scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Ya estamos en home, hacer scroll directo
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Manejar clicks en navegación
  const handleNavClick = (item, e) => {
    e.preventDefault();
    setMenuOpen(false); // Cerrar menú móvil
    
    if (item.isScroll) {
      scrollToSection(item.scrollTo);
    } else {
      navigate(item.to);
    }
  };

  const handleReservarClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/dashboard');
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    // Aquí implementarías la lógica de logout real
    // Por ahora solo navega a home
    navigate('/');
    // En el futuro: clearAuthToken(), resetUserState(), etc.
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo */}
        <Link to="/" className="logo">CarwashFreaks</Link>

        {/* Links - desktop */}
        <nav className="nav-links">
          {getNavItems().map(item => (
            <a 
              key={item.label} 
              href="#" 
              className="nav-link"
              onClick={(e) => handleNavClick(item, e)}
            >
              {item.label}
            </a>
          ))}
          {/* Botón reservar solo si NO está autenticado */}
          {!isAuthenticated && (
            <a href="#" className="nav-link reservar" onClick={handleReservarClick}>
              Reservar turno
            </a>
          )}
          {/* Botón logout solo si SÍ está autenticado */}
          {isAuthenticated && (
            <a href="#" className="nav-link" onClick={handleLogout}>
              Cerrar Sesión
            </a>
          )}
        </nav>

        {/* Hamburger menu for mobile */}
        <button
          className="hamburger"
          aria-label="Menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span style={{ fontSize: 28, color: '#222' }}>&#9776;</span>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="mobile-menu">
          {getNavItems().map(item => (
            <a 
              key={item.label} 
              href="#" 
              className="nav-link"
              onClick={(e) => handleNavClick(item, e)}
            >
              {item.label}
            </a>
          ))}
          {/* Botón reservar solo si NO está autenticado */}
          {!isAuthenticated && (
            <a href="#" className="nav-link reservar" onClick={handleReservarClick}>
              Reservar turno
            </a>
          )}
          {/* Botón logout solo si SÍ está autenticado */}
          {isAuthenticated && (
            <a href="#" className="nav-link" onClick={handleLogout}>
              Cerrar Sesión
            </a>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
