const servicesService = require('../services/services.service');

exports.getServices = async (req, res, next) => {
  try {
    const services = await servicesService.getAllServices();
    res.json(services);
  } catch (err) {
    next(err);
  }
};

exports.createService = async (req, res, next) => {
  try {
    const service = await servicesService.createService(req.body);
    res.status(201).json(service);
  } catch (err) {
    next(err);
  }
};

exports.updateService = async (req, res, next) => {
  try {
    const service = await servicesService.updateService(req.params.id, req.body);
    if (!service) return next({ status: 404, message: 'Servicio no encontrado' });
    res.json(service);
  } catch (err) {
    next(err);
  }
};

exports.deleteService = async (req, res, next) => {
  try {
    const service = await servicesService.deleteService(req.params.id);
    if (!service) return next({ status: 404, message: 'Servicio no encontrado' });
    res.json({ message: 'Servicio eliminado' });
  } catch (err) {
    next(err);
  }
};
