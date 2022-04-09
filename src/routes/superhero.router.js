const express = require('express');
const SuperheroService = require('../services/superhero.service');
const dinamic_routes = express.Router();
const superhero_model = require('../models/superhero.model');
const service = new SuperheroService();

/* JS: subporceso o un solo hilo de ejecucion
ejecuta una cosa a la vez*/
dinamic_routes.post('/superhero', async (req, res) => {
  try {
    const superhero = superhero_model(req.body);
    const data = await service.createSuperhero(superhero);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

dinamic_routes.get('/', async (req, res) => {
  try {
    const data = await service.listSuperheroes();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error);
  }
});

dinamic_routes.get('/:superheroId', async (req, res) => {
  try {
    const { superheroId } = req.params;
    const data = await service.showSuperhero(superheroId);
    res.status(302).json(data);
  } catch (error) {
    res.status(404).json(error);
  }
});

dinamic_routes.put('/:superheroId', async (req, res) => {
  try {
    const { superheroId } = req.params;
    const { superhero, realname } = req.body;
    const data = await service.editSuperhero(superheroId, superhero, realname);
    res.status(200).json(data);
  } catch (error) {
    res.status(304).json(error);
  }
});

dinamic_routes.delete('/:superheroId', async (req, res) => {
  try {
    const { superheroId } = req.params;
    const data = await service.removeSuperhero(superheroId);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = dinamic_routes;
