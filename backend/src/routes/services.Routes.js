const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const rbacMiddleware = require('../middlewares/rbac.middleware');
const servicesController = require('../controllers/servicesController');

router.get('/', servicesController.getServices);

router.post('/', authMiddleware, rbacMiddleware(['admin']), servicesController.createService);

router.put('/:id', authMiddleware, rbacMiddleware(['admin']), servicesController.updateService);

router.delete('/:id', authMiddleware, rbacMiddleware(['admin']), servicesController.deleteService);

module.exports = router;
