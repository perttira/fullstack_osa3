const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');


const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true })
  .then(result => {
    console.log('connected to MongoDB')
    //console.log('connected to MongoDB result :', result)

  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const noteSchema = new mongoose.Schema({
   // name: String,
   // number: String,
    name: {
      type: String,
      unique: true,
      required: true
    },
    number: { 
      type: String,
      required: true
    }
  //content: String,
  //date: Date,
  //important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})
noteSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Person', noteSchema)