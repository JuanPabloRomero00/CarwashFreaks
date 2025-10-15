const User = require('../models/User');
const { hashPassword, comparePassword } = require('../hash');
const {
	generateAccessToken,
	generateRefreshToken,
	verifyAccessToken,
	verifyRefreshToken
} = require('../token');


exports.createUser = async (userData) => {
	// Hashear password
const hashedPassword = await hashPassword(userData.password);
const user = new User({ ...userData, password: hashedPassword });
	await user.save();
	return user;
};

exports.generateTokens = (user) => {
	const payload = { id: user._id, email: user.email, role: user.role };
	const accessToken = generateAccessToken(payload);
	const refreshToken = generateRefreshToken(payload);
	return { accessToken, refreshToken };
};

exports.saveRefreshToken = async (userId, refreshToken) => {
	await User.findByIdAndUpdate(userId, { refreshToken });
};

exports.findByEmail = async (email) => {
	return await User.findOne({ email });
};
