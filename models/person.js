const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

const noteSchema = new mongoose.Schema({

  name: {
    type: String,
    unique: true,
    required: true,
    minlength: 3
  },
  number: {
    type: String,
    required: true,
    minlength: 8
  }
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

noteSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Person', noteSchema)