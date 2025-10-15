const permissionService = require('../services/permissions.service');

exports.getPermissions = async (req, res, next) => {
  try {
    const permissions = await permissionService.getAllPermissions();
    res.json(permissions);
  } catch (err) {
    next(err);
  }
};

exports.createPermission = async (req, res, next) => {
  try {
    const permission = await permissionService.createPermission(req.body);
    res.status(201).json(permission);
  } catch (err) {
    next(err);
  }
};

exports.updatePermission = async (req, res, next) => {
  try {
    const permission = await permissionService.updatePermission(req.params.id, req.body);
    if (!permission) return next({ status: 404, message: 'Permiso no encontrado' });
    res.json(permission);
  } catch (err) {
    next(err);
  }
};

exports.deletePermission = async (req, res, next) => {
  try {
    const permission = await permissionService.deletePermission(req.params.id);
    if (!permission) return next({ status: 404, message: 'Permiso no encontrado' });
    res.json({ message: 'Permiso eliminado' });
  } catch (err) {
    next(err);
  }
};
