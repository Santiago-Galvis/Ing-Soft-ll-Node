const express = require('express');
const router = express.Router();
const departaments_json = require('../json/api_departaments.json');

// Listar todos los departamentos con sus municipios
//http://localhost:3000/api/v1/departaments
router.get('/', (req, res) => {
  res.json(departaments_json);
});

// Ejercicio 1: Listar todos los municipios del departamento que el usuario ingrese como parametro de busqueda
// Endpoint: http://localhost:3000/api/v1/departaments/5
router.get('/:departamentId', (req, res) => {
  const { departamentId } = req.params;
  const municipalities = departaments_json.filter(
    (departament) =>
      departament['c_digo_dane_del_departamento'] === departamentId
  );
  res.json(municipalities);
});

/* 1. Mostrar los departamentos cuyo código dane es mayor a 15 y menor a 20
http://localhost:3000/api/v1/departaments/points/p1 */
router.get('/points/p1', (req, res) => {
  const municipalities = departaments_json.filter(
    (departament) =>
      departament['c_digo_dane_del_departamento'] > 15 &&
      departament['c_digo_dane_del_departamento'] < 20
  );
  res.json(municipalities);
});

/* 2. Como parámetro opcional el usuario ingresa el código del departamento y se cargan sus municipios, validar si el usuario no ingresa el
código traer todo el JSON
http://localhost:3000/api/v1/departaments/points/p2?departamentId=76
http://localhost:3000/api/v1/departaments/points/p2 */
router.get('/points/p2', (req, res) => {
  const { departamentId } = req.query;

  const municipalities = departaments_json.filter(
    (departament) =>
      departament['c_digo_dane_del_departamento'] === departamentId
  );

  departamentId ? res.json(municipalities) : res.json(departaments_json);
});

/* 3. El usuario ingresa como parámetro opcional el nombre del municipio que desea consultar de lo contrario por defecto se cargan los
municipios de Caldas
http://localhost:3000/api/v1/departaments/points/p3?municipalitieName=Campamento
http://localhost:3000/api/v1/departaments/points/p3  */
router.get('/points/p3', (req, res) => {
  const { municipalitieName } = req.query;

  const municipalities = departaments_json.filter(
    (departament) => departament['municipio'] === municipalitieName
  );

  municipalitieName
    ? res.json(municipalities)
    : res.json(
        departaments_json.filter(
          (departament) => departament['municipio'] === 'Caldas'
        )
      );
});

/* 4. Mostrar todos los departamentos cuyo nombre inicia por la letra "C"
http://localhost:3000/api/v1/departaments/points/p4 */
router.get('/points/p4', (req, res) => {

  const municipalities = departaments_json.filter(
    (departament) => departament['departamento'].charAt(0) === "C"
  );
  res.json(municipalities);
});

module.exports = router;
