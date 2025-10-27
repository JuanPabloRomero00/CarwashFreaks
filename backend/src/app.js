require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const routes = require('./routes/index');
const errorMiddleware = require('./middlewares/error.middleware');
const autoCompleteAppointments = require('../scripts/autoCompleteAppointments');
const app = express();

connectDB().catch(err => app.use((req, res, next) => next(err)));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(errorMiddleware);
autoCompleteAppointments();


module.exports = app;
