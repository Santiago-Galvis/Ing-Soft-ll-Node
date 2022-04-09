const express = require('express');
const router = express.Router();
const faker = require('faker');
const md5 = require('md5');

//http://localhost:3000/api/v1/marvels
router.get('/', (req, res) => {
  const publickey = '00f079a95f088fa23777bf29da02e01d';
  const privatekey = '756368bddc992942848061bade8220f3ecd55ab8';
  const ts = Date.now();
  const hash = md5(ts + publickey + privatekey);

  res.json(
    (URI = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publickey}&hash=${hash}`)
  );
});

module.exports = router;
