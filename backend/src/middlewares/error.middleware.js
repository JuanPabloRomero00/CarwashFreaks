module.exports = (err, req, res, next) => {
	// Log interno para debugging
	console.error('Error:', err);

	const status = err.status || 500;
	let message = err.message || 'Ocurrió un error inesperado.';

	// Personalización de mensajes por código si no hay un mensaje específico
	if (!err.message) {
        if (status === 400) message = 'Solicitud inválida.';
        if (status === 401) message = 'No autorizado.';
        if (status === 403) message = 'Acceso denegado.';
        if (status === 404) message = 'Recurso no encontrado.';
        if (status === 409) message = 'Conflicto: recurso duplicado o en uso.';
        if (status === 500) message = 'Error interno del servidor.';
    }
	
    //error generico del servidor
    if (status === 500 && !err.message) message = 'Error interno del servidor.';

	res.status(status).json({
		error: true,
		message,
		code: status
	});
};
