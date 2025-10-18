export async function cancelAppointment(appointmentId) {
  const token = localStorage.getItem('accessToken');
  const response = await fetch(`/appointments/${appointmentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    let errorData = {};
    try { errorData = await response.json(); } catch {}
    throw new Error(errorData.message || 'Error al cancelar el turno');
  }
  return response.json();
}
// src/services/api.js
export async function fetchData() {
  const response = await fetch('/api/data');
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

export async function fetchAppointments() {
  const token = localStorage.getItem('accessToken');
  const response = await fetch('/appointments', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error fetching appointments');
  }

  return response.json();
}

export async function createAppointment(appointmentData) {
  const token = localStorage.getItem('accessToken');
  const response = await fetch('/appointments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(appointmentData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al crear el turno');
  }

  return response.json();
}
