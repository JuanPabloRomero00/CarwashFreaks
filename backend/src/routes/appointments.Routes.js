const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const rbacMiddleware = require('../middlewares/rbac.middleware');
const appointmentsController = require('../controllers/appointmentsController');

router.get('/', authMiddleware, rbacMiddleware(['admin', 'user']), appointmentsController.getUserAppointments);

router.post('/', authMiddleware, rbacMiddleware(['user']), appointmentsController.createAppointment);

router.delete('/:id', authMiddleware, rbacMiddleware(['admin', 'user']), appointmentsController.cancelAppointment);

router.get('/all', authMiddleware, rbacMiddleware(['admin']), appointmentsController.getAllAppointments);

router.put('/:id', authMiddleware, rbacMiddleware(['admin']), appointmentsController.updateAppointment);

module.exports = router;
