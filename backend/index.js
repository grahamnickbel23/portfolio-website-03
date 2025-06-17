import dotenv from 'dotenv'
dotenv.config()  //get stuff from env

import express from 'express';
import cors from 'cors';
import connectDB from './src/connectDB.js';
import authLogIn from './src/controller/auth/auth logIn Service.js';
import authRegister from './src/controller/auth/auth register service.js';
import doubleAuthPrevention from './src/middleware/double auth prevention.js';
import verifyToken from './src/middleware/genaral auth service.js';
import adminAuth from './src/middleware/admin auth service.js';
import userAuth from './src/middleware/user auth service.js';
import sellerAuth from './src/middleware/seller auth service.js';
import verifyJson from './src/middleware/product admin service.js';
import productUpdateServices from './src/controller/product/product management services.js';
import catagoryUpdateServices from './src/controller/catagory management services.js';
import productView from './src/controller/product/product user services.js';
import sellerLogin from './src/controller/auth/seller auth login.js';
import sellerRegister from './src/controller/auth/seller auth register.js';

const app = express();
app.use(express.json()) //putting json middleware
app.use(cors()) // puttng CORS middlewere

connectDB();
authLogIn(app);
authRegister(app, doubleAuthPrevention, verifyToken, adminAuth);
sellerLogin(app);
sellerRegister(app, doubleAuthPrevention, verifyToken, adminAuth);
catagoryUpdateServices(app, verifyToken, adminAuth);
productUpdateServices(app, verifyToken, sellerAuth, verifyJson);
productView(app, verifyToken, userAuth);

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
