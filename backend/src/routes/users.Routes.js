const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const authMiddleware = require('../middlewares/auth.middleware');
const rbacMiddleware = require('../middlewares/rbac.middleware');

// Solo admin puede ver todos los usuarios
router.get('/', authMiddleware, rbacMiddleware(['admin']), userController.getUsers);

// Registro de usuario (público)
router.post('/', userController.createUser);

// Registro de admin (privado, protegido por secret)
router.post('/admin/register', userController.createAdmin);

module.exports = router;