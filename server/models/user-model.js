// const { Schema, model, default: mongoose } = require('mongoose')
import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
	email: {type: String, unique: true, required: true},
	password: {type: String, required: true},
	isActive: {type: Boolean, default: false},
	activationLink: {type: String}
})

// module.exports = model('User', UserSchema)
export default model('User', UserSchema);