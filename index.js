/* Importacion de librerias */
const express = require('express');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./src/middlewares/handlers/errors.handlers');

/* importacion de rutas del proyceto*/
const routerApi = require('./src/routes');
const port = process.env.PORT;
const app = express();

/* activacion del puerto */
app.listen(port, () => console.log('Listen port', port));

/* conectamos con la base de datos */
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log('Success connection with mongo'))
  .catch(() => console.error('Connection could not be established'));

/* creacion de middleware, nos eprmite usar el next en el archivo error.handler*/
app.use(logErrors);
app.use(errorHandler);
app.use(boomErrorHandler);
app.use(express.json());
routerApi(app);
