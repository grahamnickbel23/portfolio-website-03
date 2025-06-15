import dotenv from 'dotenv'
dotenv.config()  //get stuff from env

import express from 'express';
import cors from 'cors';
import connectDB from './src/connectDB.js';
import authLogIn from './src/controller/auth logIn Service.js';
import authRegister from './src/controller/auth register service.js';
import verifyToken from './src/middleware/genaral auth service.js';
import adminAuth from './src/middleware/admin auth service.js';

const app = express();
app.use(express.json()) //putting json middleware
app.use(cors()) // puttng CORS middlewere

connectDB();
authLogIn(app);
authRegister(app, verifyToken, adminAuth);

// universal error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.get('/', (req, res) => {
  res.send("Hellow my 1st local server");
});

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
