const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const port = process.env.port || 3000;
const routerApi = require('./src/routes')

require("dotenv").config();

app.listen(port, () => console.log('Listen port', port));
app.use(express.json());

mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log("Succes connection with mongo"))
    .catch(() => console.error("Connection could not be established"));

routerApi(app);