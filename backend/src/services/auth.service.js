const User = require('../models/User');
const { comparePassword } = require('../utils/hash');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
} = require('../utils/token');

exports.login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) return null;
  const valid = await comparePassword(password, user.password);
  if (!valid) return null;
  const payload = { id: user._id, email: user.email, role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  await User.findByIdAndUpdate(user._id, { refreshToken });
  return { user, accessToken, refreshToken };
};

exports.refresh = async (refreshToken) => {
  let payload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    return null;
  }
  const user = await User.findById(payload.id);
  if (!user || user.refreshToken !== refreshToken) return null;
  const newAccessToken = generateAccessToken({ id: user._id, email: user.email, role: user.role });
  const newRefreshToken = generateRefreshToken({ id: user._id, email: user.email, role: user.role });
  await User.findByIdAndUpdate(user._id, { refreshToken: newRefreshToken });
  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

exports.logout = async (userId) => {
  await User.findByIdAndUpdate(userId, { refreshToken: null });
};
