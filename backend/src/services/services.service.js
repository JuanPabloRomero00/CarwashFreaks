const Service = require('../models/Service');

exports.getAllServices = async () => {
  return await Service.find();
};

exports.createService = async (data) => {
  const service = new Service(data);
  await service.save();
  return service;
};

exports.updateService = async (id, data) => {
  return await Service.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteService = async (id) => {
  return await Service.findByIdAndDelete(id);
};
