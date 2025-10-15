const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const rbacMiddleware = require('../middlewares/rbac.middleware');
const permissionController = require('../controllers/permissionControler');

// Obtener todos los permisos (solo admin)
router.get('/', authMiddleware, rbacMiddleware(['admin']), permissionController.getPermissions);

// Crear permiso (solo admin)
router.post('/', authMiddleware, rbacMiddleware(['admin']), permissionController.createPermission);

// Actualizar permiso (solo admin)
router.put('/:id', authMiddleware, rbacMiddleware(['admin']), permissionController.updatePermission);

// Eliminar permiso (solo admin)
router.delete('/:id', authMiddleware, rbacMiddleware(['admin']), permissionController.deletePermission);

module.exports = router;
