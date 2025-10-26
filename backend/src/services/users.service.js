const User = require('../models/User');
const { hashPassword, comparePassword } = require('../utils/hash');
const {
	generateAccessToken,
	generateRefreshToken,
	verifyAccessToken,
	verifyRefreshToken
} = require('../utils/token');


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

exports.getAllUsers = async () => {
	return await User.find();
};

exports.updateUser = async (id, updateData) => {
    // Solo actualizar password si viene y no está vacío
    if (updateData.password && updateData.password.trim() !== "") {
        updateData.password = await hashPassword(updateData.password);
    } else {
        delete updateData.password;
    }
    return await User.findByIdAndUpdate(id, updateData, { 
        new: true, 
        runValidators: true 
    });
};
