const express = require('express');
const serie_model = require('../models/series_tv.model');
const serie_route = express.Router();
const SerieService = require('../services/series.service');
const _service_serie = new SerieService();

// Ruta para crear nuevas series -> EndPoint: http://localhost:5000/api/v2/series/serie
// Async -> Espera una respuesta
serie_route.post('/serie', async (req, res) => {
  try {
    const new_serie = serie_model(req.body);
    // Esperar y no sigue hasta que retorne
    const data_service = await _service_serie.createSerie(new_serie);
    res.status(201).json(data_service);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});


// Ruta para listar las series existentes -> EndPoint: http://localhost:5000/api/v2/series
serie_route.get('/', async (req, res) => {
  try {
    const data_service = await _service_serie.listSeries();
    res.status(200).json(data_service);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// Ruta para listar las series existentes con espera de 3 segundos-> EndPoint: http://localhost:5000/api/v2/series
serie_route.get('/3seconds', async (req, res) => {
  try {
    const data_service = await _service_serie.listseries3Seconds();
    res.status(200).json(data_service);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

serie_route.get('/:serieId', async (req, res, next) => {
  try {
    const { serieId } = req.params;
    const data_service = await _service_serie.showSerie(serieId);
    res.status(200).json(data_service);
  } catch (error) {
    next(error);
  }
});
serie_route.put('/:serieId', async (req, res, next) => {
  try {
    const { serieId } = req.params;
    const { serie, number_seasons, original_languaje, features_seasons} = req.body;
    const data_service = await _service_serie.updateSerie(
      serieId,
      serie,
      number_seasons,
      original_languaje,
      features_seasons
    );
    res.status(200).json(data_service);
  } catch (error) {
    next(error);
  }
});
serie_route.delete('/:serieId', async (req, res, next) => {
  try {
    const { serieId } = req.params;
    const data_service = await _service_serie.removeSerie(serieId);
    res.status(200).json(data_service);
  } catch (error) {
    next(error);
  }
});

module.exports = serie_route;
