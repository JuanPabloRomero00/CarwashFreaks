import React, { useEffect, useState } from 'react';
import AppointmentsList from '../components/AppointmentsList';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchData } from '../services/api';

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular datos de turnos hasta conectar con backend real
    const mockAppointments = [
      {
        id: 1,
        serviceName: 'Lavado Exterior',
        date: '2025-10-05',
        time: '10:00',
        price: 15,
        status: 'confirmed',
        notes: 'Auto sedán color azul'
      },
      {
        id: 2,
        serviceName: 'Detailing Completo',
        date: '2025-10-08',
        time: '14:30',
        price: 45,
        status: 'pending',
        notes: ''
      }
    ];
    
    // Simular loading
    setTimeout(() => {
      setAppointments(mockAppointments);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div>
        <Header />
        <main style={{ marginTop: 80, padding: 20, textAlign: 'center' }}>
          <p>Cargando tus turnos...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main style={{ marginTop: 80, padding: 20 }}>
        <AppointmentsList appointments={appointments} />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
