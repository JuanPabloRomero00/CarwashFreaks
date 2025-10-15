const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const rbacMiddleware = require('../middlewares/rbac.middleware');
const servicesController = require('../controllers/servicesController');

// Obtener todos los servicios (público)
router.get('/', servicesController.getServices);

// Crear servicio (solo admin)
router.post('/', authMiddleware, rbacMiddleware(['admin']), servicesController.createService);

// Actualizar servicio (solo admin)
router.put('/:id', authMiddleware, rbacMiddleware(['admin']), servicesController.updateService);

// Eliminar servicio (solo admin)
router.delete('/:id', authMiddleware, rbacMiddleware(['admin']), servicesController.deleteService);

module.exports = router;
