import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/UserAppointments';
import Login from './pages/Login';
import Register from './pages/Register';
import UserAppointments from './pages/UserAppointments';
import AdminPanel from './pages/AdminPanel';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/user-appointments" element={<UserAppointments />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  </Router>
);

export default App;
