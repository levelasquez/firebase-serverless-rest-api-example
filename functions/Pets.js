const mongoose = require('mongoose')

const Pets = mongoose.model('pet', {
  name: String,
  type: String,
  description: String,
})

module.exports = Pets
