const userService = require('../services/users.service');
const { comparePassword } = require('../utils/hash');
const crypto = require('crypto');
const emailService = require('../services/email.service');
const User = require('../models/User');

// GET /users (solo admin)
exports.getUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { nombre, apellido, email, telefono, password } = req.body;
    if (!nombre || !apellido || !email || !telefono || !password) {
      return next({ status: 400, message: 'Todos los campos son obligatorios.' });
    }
    // Validación básica de email y password
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return next({ status: 400, message: 'El correo electrónico no es válido.' });
    }
    if (password.length < 6) {
      return next({ status: 400, message: 'La contraseña debe tener al menos 6 caracteres.' });
    }
    const exists = await userService.findByEmail(email);
    if (exists) return next({ status: 409, message: 'Email ya registrado.' });
    const user = await userService.createUser(req.body);
    const tokens = userService.generateTokens(user);
    await userService.saveRefreshToken(user._id, tokens.refreshToken);
    res.status(201).json({ user, ...tokens });
  } catch (error) {
    next(error);
  }
};

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

// PUT /users/:id (solo admin)
exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // No permitir cambiar email a uno que ya existe
    if (updateData.email) {
      const existingUser = await userService.findByEmail(updateData.email);
      if (existingUser && existingUser._id.toString() !== id) {
        return next({ status: 409, message: 'Email ya está en uso' });
      }
    }
    
    const user = await userService.updateUser(id, updateData);
    if (!user) return next({ status: 404, message: 'Usuario no encontrado' });
    
    res.json({ message: 'Usuario actualizado exitosamente', user });
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await userService.findByEmail(email);
    if (!user) return res.status(200).json({ message: 'Si el email existe, se enviará un enlace.' });

    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 1000 * 60 * 60; // 1 hora
    await user.save();

    const resetUrl = `http://localhost:5173/reset-password?token=${token}`;
    const nombre = user.nombre || '';

    await emailService.sendMail({
      to: user.email,
      subject: 'Solicitud de recuperación de contraseña',
      text: `
Hola${nombre ? ' ' + nombre : ''},

Recibimos una solicitud para restablecer la contraseña de tu cuenta en CarwashFreaks.

Para continuar, haz clic en el siguiente enlace o cópialo en tu navegador:
${resetUrl}

Si no solicitaste este cambio, puedes ignorar este correo. Tu contraseña actual seguirá siendo válida.

Por seguridad, este enlace expirará en 1 hora.

Saludos cordiales,
El equipo de CarwashFreaks
      `.trim(),
      html: `
        <p>Hola${nombre ? ' ' + nombre : ''},</p>
        <p>Recibimos una solicitud para <strong>restablecer la contraseña</strong> de tu cuenta en <b>CarwashFreaks</b>.</p>
        <p>Para continuar, haz clic en el siguiente enlace o cópialo en tu navegador:</p>
        <p><a href="${resetUrl}" style="color:#1976d2;">${resetUrl}</a></p>
        <p style="color:#888;font-size:0.95em;">
          Si no solicitaste este cambio, puedes ignorar este correo. Tu contraseña actual seguirá siendo válida.<br>
          Por seguridad, este enlace expirará en <b>1 hora</b>.
        </p>
        <b>El equipo de CarwashFreaks</b></p>
      `
    });

    res.json({ message: 'Si el email existe, se enviará un enlace.' });
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    console.log('Body recibido:', req.body);

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    console.log('Usuario encontrado:', user);

    if (!user) return res.status(400).json({ message: 'Token inválido o expirado.' });

    user.password = await require('../utils/hash').hashPassword(password);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Contraseña actualizada correctamente.' });
  } catch (error) {
    next(error);
  }
};