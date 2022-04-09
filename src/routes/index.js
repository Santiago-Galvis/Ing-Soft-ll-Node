const express = require("express");
const serie_routes = require('./series.routes');

function routerApi(app){
    const dynamic_routes = express.Router();
    app.use("/api/v2", dynamic_routes); /* endpoint http://localhost:3000/api/v2 */
    dynamic_routes.use('/series', serie_routes);
}

module.exports = routerApi;