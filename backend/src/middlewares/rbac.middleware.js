module.exports = (required) => {
	return (req, res, next) => {
		if (!req.user || !req.user.role) {
			return next({ status: 401, message: 'No autorizado' });
		}

		// Si required es ['*'] permite solo admin
		if (Array.isArray(required) && required.includes('*')) {
			if (req.user.role !== 'admin') {
				return next({ status: 403, message: 'Acceso denegado: solo admin' });
			}
			return next();
		}

		if (Array.isArray(required) && required.includes(req.user.role)) {
			return next();
		}

		if (typeof required === 'string') {
			if (req.user.permissions && req.user.permissions.includes(required)) {
				return next();
			}
			return next({ status: 403, message: 'Acceso denegado: permiso insuficiente' });
		}

		if (Array.isArray(required)) {
			if (req.user.permissions && required.some(p => req.user.permissions.includes(p))) {
				return next();
			}
			return next({ status: 403, message: 'Acceso denegado: permisos insuficientes' });
		}

		return next({ status: 403, message: 'Acceso denegado' });
	};
};
