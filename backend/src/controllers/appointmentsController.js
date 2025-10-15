const appointmentsService = require('../services/appointments.service');

exports.getUserAppointments = async (req, res, next) => {
  try {
    const appointments = await appointmentsService.getUserAppointments(req.user._id);
    res.json(appointments);
  } catch (err) {
    next(err);
  }
};

exports.createAppointment = async (req, res, next) => {
  try {
    const appointment = await appointmentsService.createAppointment({ ...req.body, user: req.user._id });
    res.status(201).json(appointment);
  } catch (err) {
    next(err);
  }
};

exports.cancelAppointment = async (req, res, next) => {
  try {
    const isAdmin = req.user.role === 'admin';
    const appointment = await appointmentsService.cancelAppointment(req.params.id, req.user._id, isAdmin);
    if (!appointment) return next({ status: 404, message: 'Turno no encontrado o sin permisos' });
    res.json(appointment);
  } catch (err) {
    next(err);
  }
};

exports.getAllAppointments = async (req, res, next) => {
  try {
    const appointments = await appointmentsService.getAllAppointments();
    res.json(appointments);
  } catch (err) {
    next(err);
  }
};

exports.updateAppointment = async (req, res, next) => {
  try {
    const appointment = await appointmentsService.updateAppointment(req.params.id, req.body);
    if (!appointment) return next({ status: 404, message: 'Turno no encontrado' });
    res.json(appointment);
  } catch (err) {
    next(err);
  }
};
