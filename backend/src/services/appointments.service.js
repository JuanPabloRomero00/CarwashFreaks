const Appointment = require('../models/Appointment');

exports.getUserAppointments = async (userId) => {
  return await Appointment.find({ user: userId }).populate('service');
};

exports.createAppointment = async (data) => {
  // Validación de fecha y hora
  const now = new Date();
  const selectedDate = new Date(data.date);
  // Si la fecha es anterior a hoy, rechazar
  if (selectedDate.setHours(0,0,0,0) < now.setHours(0,0,0,0)) {
    const err = new Error('No puedes reservar en fechas pasadas');
    err.status = 400;
    throw err;
  }
  // Si es el día actual, validar hora
  if (selectedDate.setHours(0,0,0,0) === now.setHours(0,0,0,0)) {
    const [hora, min] = data.time.replace('hs','').split(':');
    const turnoMin = parseInt(hora) * 60 + parseInt(min);
    const nowMin = now.getHours() * 60 + now.getMinutes();
    if (turnoMin <= nowMin) {
      const err = new Error('No puedes reservar en horarios pasados');
      err.status = 400;
      throw err;
    }
  }
  const appointment = new Appointment(data);
  await appointment.save();
  return appointment;
};

exports.cancelAppointment = async (id, userId, isAdmin = false) => {
  const appointment = await Appointment.findById(id);
  if (!appointment) return null;
  if (!isAdmin && appointment.user.toString() !== userId.toString()) {
    return null;
  }
  appointment.status = 'cancelled';
  await appointment.save();
  return appointment;
};

exports.getAllAppointments = async () => {
  return await Appointment.find().populate('user service');
};

exports.updateAppointment = async (id, data) => {
  return await Appointment.findByIdAndUpdate(id, data, { new: true });
};
