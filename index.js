const routerApi = require('./routes');
const express = require('express');
const my_app = express();
const mongoose = require('mongoose');
const port = 3000;

require('dotenv').config();
routerApi(my_app);

// Ocupamos el puerto por el cual corre el proyecto
my_app.listen(port, () => {
  console.log('Listening Active in the port', port);
});

// Endpoint http://localhost:3000
my_app.get('/', (req, res) => {
  res.send('Prueba de la api restful marvel');
});

mongoose
  .connect(process.env.MONGODB_CONNECT_STRING)
  .then(() => {
    console.log('Success Conection with mongo');
  })
  .catch((error) => {
    console.log('Failed connection with mongo');
  });
