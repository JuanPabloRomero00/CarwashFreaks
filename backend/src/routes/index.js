const express = require('express');
const router = express.Router();

router.use('/users', require('./users.Routes'));
router.use('/services', require('./services.Routes'));
router.use('/permissions', require('./permission.Routes'));
router.use('/auth', require('./auth.Routes'));
router.use('/appointments', require('./appointments.Routes'));

module.exports = router;
