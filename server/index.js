require('dotenv').config()
// import dotenv from 'dotenv';
// dotenv.config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/index')

const app = express()
const PORT = process.env.PORT || 6000;

app.use(cookieParser());
app.use(express.json());
app.use(cors({
	origin: 'http://localhost:5000',
  credentials: true

}));
app.use('/api', router)

const start = async () => {
	try {
		await mongoose.connect(process.env.DB_URL, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
		})
		app.listen(PORT, () => console.log(`server started at ${PORT}`))
		console.log('start')
	} catch (error) {
		console.log(`start server error ${error}`)
	}

}
start()