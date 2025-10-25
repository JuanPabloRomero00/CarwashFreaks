const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const authMiddleware = require('../middlewares/auth.middleware');
const rbacMiddleware = require('../middlewares/rbac.middleware');

router.get('/', authMiddleware, rbacMiddleware(['admin']), userController.getUsers);

router.post('/', userController.createUser);

router.put('/:id', authMiddleware, rbacMiddleware(['admin']), userController.updateUser);

router.post('/admin/register', userController.createAdmin);

module.exports = router;