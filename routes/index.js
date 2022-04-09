const express = require('express');
const moviesRouter = require('./movies.router');
const fakersRouter = require('./fakers.router');
const departamentsRouter = require('./departaments.router');
const marvelsRouter = require('./marvels.router');

function routerApi(my_app) {
  const router = express.Router();
  // Parte estatica del endpoint: http://localhost:3000/api/v1
  my_app.use('/api/v1', router);
  // Parte estatica más la dinamica del endpoint: http://localhost:3000/api/v1/movies
  router.use('/movies', moviesRouter);
  // Parte estatica más la dinamica del endpoint: http://localhost:3000/api/v1/fakers
  router.use('/fakers', fakersRouter);
  // Parte estatica más la dinamica del endpoint: http://localhost:3000/api/v1/despartaments
  router.use('/departaments', departamentsRouter);
  // Parte estatica más la dinamica del endpoint: http://localhost:3000/api/v1/marvels
  router.use('/marvels', marvelsRouter);
}

module.exports = routerApi;
