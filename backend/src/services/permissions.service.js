const Permission = require('../models/Permission');

exports.getAllPermissions = async () => {
  return await Permission.find();
};

exports.createPermission = async (data) => {
  const permission = new Permission(data);
  await permission.save();
  return permission;
};

exports.updatePermission = async (id, data) => {
  return await Permission.findByIdAndUpdate(id, data, { new: true });
};

exports.deletePermission = async (id) => {
  return await Permission.findByIdAndDelete(id);
};
