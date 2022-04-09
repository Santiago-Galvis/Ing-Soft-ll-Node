const { default: mongoose } = require("mongoose");
const { object } = require("webidl-conversions");

const personSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  lastname:{
    type: String,
    required: true
  },
  age:{
    type: Number,
    required: true
  },
  address:{
    type: Object,
    required: true,
      city:{
        type: String,
        required: true,
      },
      code_zip: {
        type: String,
        required: true,
      },
  },
});
module.exports = mongoose.model('PeopleCollection', personSchema);