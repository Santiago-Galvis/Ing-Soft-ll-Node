const Boom = require('@hapi/boom'); // Para que devuelva errores de la libreria de Boom

// Función que permite visualizar los errores por consola
const logErrors = (err, req, res, next) => {
  console.log(err);
  next(err); // Es como un return
};

// Para que devuelva el error en forma de json
const errorHandler = (err, req, res, next) => {
  //Esta función la podemos llamar desde el servicio para que nos muestre enc aso de error, un status 404
  res.status(404).json({
    message: err.message,
    // Para dar más información del error
    stack: err.stack,
  });
};

// Hace uso de la libreria @hapi/boom para el manejo de errores en http
const boomErrorHandler = (err, req, res, next) => {
  // Busca si el error está en la libreria de boom y devuelve el statussCode
  if(err.isBoom){
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
};

module.exports = {logErrors, errorHandler, boomErrorHandler};