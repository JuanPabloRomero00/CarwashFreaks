const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (!token) {
		return next({ status: 401, message: 'No autorizado' });
	}
	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.user = await User.findById(payload.id);
		next();
	} catch (err) {
		return next({ status: 403, message: 'Token inválido o expirado' });
	}
};
