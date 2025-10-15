const Appointment = require('../models/Appointment');

exports.getUserAppointments = async (userId) => {
  return await Appointment.find({ user: userId }).populate('service');
};

exports.createAppointment = async (data) => {
  const appointment = new Appointment(data);
  await appointment.save();
  return appointment;
};

exports.cancelAppointment = async (id, userId, isAdmin = false) => {
  const appointment = await Appointment.findById(id);
  if (!appointment) return null;
  if (!isAdmin && appointment.user.toString() !== userId) return null;
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
