// require('dotenv').config()
import dotenv from 'dotenv';
dotenv.config();

import express, { json } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import router from './router/index.js';

const app = express()
// const PORT = process.env.PORT || 6000;
const PORT = 5000;

app.use(cookieParser());
app.use(json());
app.use(cors({
	origin: 'http://localhost:5000',
  credentials: true

}));
app.use('/api', router)

const start = async () => {
	try {
		await mongoose.connect(process.env.DB_URL, {})
		app.listen(PORT, () => console.log(`server started at ${PORT}`))
		console.log('start')
	} catch (error) {
		console.log(`start server error ${error}`)
	}

}
start()