const authService = require('../services/auth.service');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    if (!result) return next({ status: 401, message: 'Credenciales inválidas' });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    const result = await authService.refresh(refreshToken);
    if (!result) return next({ status: 401, message: 'Refresh token inválido' });
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const { userId } = req.body;
    await authService.logout(userId);
    res.json({ message: 'Logout exitoso' });
  } catch (err) {
    next(err);
  }
};
