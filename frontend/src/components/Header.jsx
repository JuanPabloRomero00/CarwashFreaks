
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Inicio', to: '/' },
  { label: 'Servicios', to: '/servicios' },
  { label: 'Turnos', to: '/turnos' },
  { label: 'Contacto', to: '/contacto' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Simulación de autenticación (reemplazar por lógica real)
  const isAuthenticated = false;

  const handleReservarClick = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/reservar');
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo */}
        <Link to="/" className="logo">CarwashFreaks</Link>

        {/* Links - desktop */}
        <nav className="nav-links">
          {navItems.map(item => (
            <Link key={item.label} to={item.to} className="nav-link">{item.label}</Link>
          ))}
          <a href="/reservar" className="nav-link reservar" onClick={handleReservarClick}>Reservar turno</a>
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
          {navItems.map(item => (
            <Link key={item.label} to={item.to} className="nav-link" onClick={() => setMenuOpen(false)}>{item.label}</Link>
          ))}
          <a href="/reservar" className="nav-link reservar" onClick={handleReservarClick}>Reservar turno</a>
        </nav>
      )}
    </header>
  );
};

export default Header;
