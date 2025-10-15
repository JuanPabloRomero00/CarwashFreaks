const userService = require('../services/users.service');
const { comparePassword } = require('../hash');

// GET /users (solo admin)
exports.getUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// POST /users (registro)
exports.createUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const exists = await userService.findByEmail(email);
  if (exists) return next({ status: 409, message: 'Email ya registrado' });
    const user = await userService.createUser(req.body);
    const tokens = userService.generateTokens(user);
    await userService.saveRefreshToken(user._id, tokens.refreshToken);
    res.status(201).json({ user, ...tokens });
  } catch (error) {
    next(error);
  }
};

// POST /users/login
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.findByEmail(email);
  if (!user) return next({ status: 401, message: 'Credenciales inválidas' });
  const valid = await comparePassword(password, user.password);
  if (!valid) return next({ status: 401, message: 'Credenciales inválidas' });
    const tokens = userService.generateTokens(user);
    await userService.saveRefreshToken(user._id, tokens.refreshToken);
    res.json({ user, ...tokens });
  } catch (error) {
    next(error);
  }
};

// POST /users/admin/register (privado)
exports.createAdmin = async (req, res, next) => {
  try {
    const secret = req.query.secret;
    if (secret !== process.env.ADMIN_REGISTER_SECRET) {
      return next({ status: 403, message: 'Acceso denegado: secret inválido' });
    }
    const { email } = req.body;
    const exists = await userService.findByEmail(email);
    if (exists) return next({ status: 409, message: 'Email ya registrado' });
    // Asignar rol admin
    const user = await userService.createUser({ ...req.body, role: 'admin' });
    const tokens = userService.generateTokens(user);
    await userService.saveRefreshToken(user._id, tokens.refreshToken);
    res.status(201).json({ user, ...tokens });
  } catch (error) {
    next(error);
  }
};