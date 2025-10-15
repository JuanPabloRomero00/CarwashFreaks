// Middleware RBAC: verifica si el usuario tiene el rol o permiso requerido
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

		// Si required es array de roles
		if (Array.isArray(required) && required.includes(req.user.role)) {
			return next();
		}

		// Si required es string de permiso, verifica en req.user.permissions
		if (typeof required === 'string') {
			if (req.user.permissions && req.user.permissions.includes(required)) {
				return next();
			}
			return next({ status: 403, message: 'Acceso denegado: permiso insuficiente' });
		}

		// Si required es array de permisos
		if (Array.isArray(required)) {
			if (req.user.permissions && required.some(p => req.user.permissions.includes(p))) {
				return next();
			}
			return next({ status: 403, message: 'Acceso denegado: permisos insuficientes' });
		}

		// Si no cumple nada, denegar
		return next({ status: 403, message: 'Acceso denegado' });
	};
};
