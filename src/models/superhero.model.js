const mongoose = require('mongoose');
const superheroSchema = mongoose.Schema({
  superhero: {
    type: String,
    require: true,
  },
  realname: {
    type: String,
    require: true,
  },
});
module.exports = mongoose.model('SuperheroCollection', superheroSchema);
