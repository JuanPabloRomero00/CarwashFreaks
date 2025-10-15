const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const rbacMiddleware = require('../middlewares/rbac.middleware');
const appointmentsController = require('../controllers/appointmentsController');

// Solo usuarios autenticados pueden ver sus turnos
router.get('/', authMiddleware, rbacMiddleware(['admin', 'user']), appointmentsController.getUserAppointments);

// Crear turno (solo usuario)
router.post('/', authMiddleware, rbacMiddleware(['user']), appointmentsController.createAppointment);

// Cancelar turno (solo usuario dueño o admin)
router.delete('/:id', authMiddleware, rbacMiddleware(['admin', 'user']), appointmentsController.cancelAppointment);

// Admin: ver todos los turnos, modificar, eliminar
router.get('/all', authMiddleware, rbacMiddleware(['admin']), appointmentsController.getAllAppointments);

router.put('/:id', authMiddleware, rbacMiddleware(['admin']), appointmentsController.updateAppointment);

module.exports = router;
