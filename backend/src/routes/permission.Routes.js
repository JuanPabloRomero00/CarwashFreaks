const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const rbacMiddleware = require('../middlewares/rbac.middleware');
const permissionController = require('../controllers/permissionControler');

router.get('/', authMiddleware, rbacMiddleware(['admin']), permissionController.getPermissions);

router.post('/', authMiddleware, rbacMiddleware(['admin']), permissionController.createPermission);

router.put('/:id', authMiddleware, rbacMiddleware(['admin']), permissionController.updatePermission);

router.delete('/:id', authMiddleware, rbacMiddleware(['admin']), permissionController.deletePermission);

module.exports = router;
