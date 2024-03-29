require('dotenv').config()
// import dotenv from 'dotenv';
// dotenv.config();

// import express, { json } from 'express';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import mongoose from 'mongoose';
// import router from './router/index.js';

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser'); 
const mongoose = require('mongoose'); 
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-moddleware')

const app = express()
// const PORT = process.env.PORT || 6000;
const PORT = 5000;

app.use(express.json())
app.use(cookieParser());
app.use(cors({
	credentials: true,
	origin: process.env.CLIENT_URL
}));
app.use('/api', router);
app.use(errorMiddleware)

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