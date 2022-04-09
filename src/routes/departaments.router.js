const express = require('express');
const routes = express.Router();
const departaments = require('../json/departaments.json');

/* http://localhost:3000/api/v1/departaments */
routes.get('/all', (req, res) => {
  res.json(departaments);
});

/* Consultar los municipios de un departamento especifico en la ruta */
/* http://localhost:3000/api/v1/departaments/5 */
routes.get('/:departamentId', (req, res) => {
  const { departamentId } = req.params;
  const municipios = departaments.filter(
    (departament) =>
      departament['c_digo_dane_del_departamento'] === departamentId
  );
  res.json(municipios);
});

/* 1. Mostrar los departamentos cuyo código dane es mayor a 15 y menor a 20 */
/* http://localhost:3000/api/v1/departaments/filter/code */
routes.get('/filter/code', (req, res) => {
  try {
    const municipios = departaments.filter(
      (departament) =>
        departament['c_digo_dane_del_departamento'] > 15 &&
        departament['c_digo_dane_del_departamento'] < 20
    );
    res.json(municipios);
  } catch (e) {
    console.log(e);
  }
});

/* 2. Como parámetro opcional el usuario ingresa el código del departamento y se cargan sus municipios, validar si el usuario no ingresa el código traer todo el JSON*/
/* http://localhost:3000/api/v1/departaments/filter/search?departamentId=5 */
routes.get('/filter/search', (req, res) => {
  const { departamentId } = req.query;
  departamentId
    ? res.json(
        departaments.filter(
          (departament) =>
            departament['c_digo_dane_del_departamento'] === departamentId
        )
      )
    : res.json(departaments);
});

/* 3. El usuario ingresa como parámetro opcional el nombre del municipio que desea consultar de lo contrario por defecto se cargan los
municipios de Caldas */
/* http://localhost:3000/api/v1/departaments/filter/name?municipalityName=Cajibío */
routes.get('/filter/name', (req, res) => {
  const { municipalityName } = req.query;
  const caldas = '17';
  municipalityName
    ? res.json(
        departaments.filter(
          (departament) => departament['municipio'] === municipalityName
        )
      )
    : res.json(
        departaments.filter(
          (departament) =>
            departament['c_digo_dane_del_departamento'] === caldas
        )
      );
});

/* 4. Mostrar todos los departamentos cuyo nombre inicia por la letra "C" */
/* http://localhost:3000/api/v1/departaments/filter/letter */
routes.get('/filter/letter', (req, res) => {
  try {
    res.json(
      departaments.filter(
        (departament) => departament['departamento'].charAt(0) == 'C'
      )
    );
  } catch (e) {
    console.log(e);
  }
});

module.exports = routes;
