// import model from '../models/user-model.js';
// const UserModel = model;
// import bcrypt from 'bcrypt';
// import UserDto from '../dtos/user-dto.js';
// import uuid from 'uuid';
// import mailService from '../service/mail-service.js';

const UserModel = require('../models/user-model.js')
const bcrypt = require('bcrypt')
const uuid = require('uuid');
const mailService = require('../service/mail-service.js');
const UserDto = require('../dtos/user-dto.js');
const tokenService = require('./token-service')


class UserService {
	 async registration(email, password) {
		const candidate = await UserModel.findOne({ email })
		if(candidate) {
			throw new Error(`Пользователь с таким имейлом ${email} уже существует`)
		}
		const hashPassword = await bcrypt.hash(password, 3);
		const activationLink = uuid.v4();
		const user = await UserModel.create({email, password: hashPassword, activationLink});
		await mailService.sendActivateMail( email, process.env.API_URL + `/api/activate/${activationLink}`);

		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...UserDto });
		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return {...tokens, user: userDto}
	 }
	 async activate(activationLink) {
		const user = await UserModel.findOne({activationLink})
		if(!user) {
			throw new Error('Некорректная ссылка активации')
		}
		user.isActivated = true;
		await user.save();
	}
}
module.exports = new UserService()