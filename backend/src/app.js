const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const routes = require('./routes/index');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

// Conexión a la base de datos
connectDB().catch(err => app.use((req, res, next) => next(err)));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Todas las rutas pasan por el router centralizado
app.use(routes);

// Middleware de manejo de errores
app.use(errorMiddleware);

module.exports = app;
