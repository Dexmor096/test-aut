const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model');
const ApiError = require('../exceptions/api-error')

class TokenService {
	generateTokens(payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30d'});
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});
		return {
			accessToken,
			refreshToken
		}
	}
	async saveToken(userId, refreshToken) {
		const tokenData = await tokenModel.findOne({user: userId})
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save()
		}
		const token= await tokenModel.create( {user: userId, refreshToken})
		return token;
	}
	async deleteToken(refreshToken) {
		const tokenData = await tokenModel.deleteOne({refreshToken});
		return tokenData
	}
	async validateAccessToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
			return userData;
		} catch (e) {
			return null;
		}
	}
	async validateRefreshToken(token) {
		try {
			const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
			return userData;
		} catch (e) {
			return null;
		}
	}
	async findToken(refreshToken) {
		const tokenData = await tokenModel.findOne({refreshToken});
		return tokenData
	}
 }
// export default new TokenService();
module.exports = new TokenService();