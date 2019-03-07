//const http = require('http')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

var personsArray
// error-viesti jos urli ei sovi mihinkään routeen



/*    3.1 puhelinluettelon backend osa 1 && 3.2 puhelinluettelon backend osa 2
// && 3.3 puhelinluettelon backend osa 3 && 3.4 puhelinluettelon backend osa 4
// && 3.5 puhelinluettelon backend osa 5 && 3.6 puhelinluettelon backend osa 6
// && 3.7 puhelinluettelon backend osa 7 && 3.8* puhelinluettelon backend osa 8
// && 3.9 puhelinluettelon backend step9 && 3.10 puhelinluettelon backend step10
// && 3.11 puhelinluettelo full stack && 3.12: tietokanta komentoriviltä
// && 3.13: puhelinluettelo ja tietokanta, step1 && 3.14: puhelinluettelo ja tietokanta, step2
// 3.15: puhelinluettelo ja tietokanta, step3 && 3.16: puhelinluettelo ja tietokanta, step3
// 3.17*: puhelinluettelo ja tietokanta, step4 && 3.18*: puhelinluettelo ja tietokanta, step5
// 3.19: puhelinluettelo ja tietokanta, step7 && 3.20*: puhelinluettelo ja tietokanta, step8






*/

app.use(cors())

/* asetetaan backend käyttämään buildia. 
Kommentoi pois jos haluat käyttää development versiota (esim osa2) */
app.use(express.static('build'))


//const password = process.argv[2]

//const url = process.env.MONGODB_URI
//const url = `mongodb+srv://perttira:${password}@pessi-rx9a5.mongodb.net/fullstack?retryWrites=true`

//mongoose.connect(url, { useNewUrlParser: true })
/*
const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
  //date: Date,
  //important: Boolean,
})
*/

//const Person = mongoose.model('Person', noteSchema)

/*
const person = new Person({
  name: name,
  number: number,
  //date: Date,
  //important: Boolean,
})
*/

const logger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

var custom_token = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    JSON.stringify(req.body),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
})

app.use(bodyParser.json(), logger, custom_token)

let persons = [
    {
      name: 'koira',
      number: '222',
      id: 1
    },
    {
      name: 'Kimmo Koskenkorva',
      number: '050-6667778',
      id: 2
    },
    {
      name: 'Mauri Muntteri',
      number: '040-4566543',
      id: 3
    },
    {
      name: 'Liisa Laudrup',
      number: '044-0451500',
      id: 4
    }
  ]


  /**
 * Random generator
 * @param {TYPE} arg
 * @return {!Array<TYPE>}
 * @template TYPE
 */
  const generateId = () => {    
    return Math.floor(Math.random() * Math.floor(1000000000000000000000));
  }


  /*  */
  app.get('/api/persons', (request, response) => {

    Person.find({}).then(notes => {
      personsArray = notes.map(note => note.toJSON())
      console.log('personsArray', personsArray);
      response.json(personsArray)
    });

    //console.log('allPersons', allPersons);
    
  })


  
  /*   */
  app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
      .then(note => {
        if (note) {
          response.json(note.toJSON())
        } else {
          response.status(204).end()
        }
      })
      .catch(error => next(error))
  })


  
  /*   */
  app.delete('/api/persons/:id', (request, response) => {
    // id:tä ei löytynyt jos filter palauttaa tyhjän taulukon
    personsArray.map(note => console.log('note.id', note.id))
    
    if ( personsArray.filter(note => note.id == request.params.id).length != 0 ) {
      personsArray = personsArray.filter(note => note.id != request.params.id)

      Person.findByIdAndRemove(request.params.id, (err, person) => {
        if (err) return res.status(500).send(err)
        return response.status(204).end()
    }).catch(error => next(error))
    
    } else {
      response.status(404).end()
    }
  })


  /*   */
  app.get('/info', (req, res) => {
    var date = new Date()
    res.write("<div>Puhelinluettelossa "+personsArray.length +" henkilon tiedot</div>")
    res.write("<div>"+date+"</div>")
    res.end()
  })

  
  app.put('/api/persons/:id', (request, response) => {

    const body = request.body

    if(personsArray.find(function(element) {
      return request.params.id == element.id;
    })){
      personsArray = personsArray.map(function(person){
        if(person.name === body.name) {
          person.number = body.number
        }
        return person
      })

      Person.findByIdAndUpdate(request.params.id, { $set: { number: body.number }}, {new: true}, (err, person) => {
              if (err) return response.status(500).send(err);
              return response.json(person);
          }).catch(error => next(error))
      
    } else {   
      return response.status(400).json({error: 'Did not find person from database'})
    }
  })


  /*   */
  app.post('/api/persons', (request, response, next) => {
    
    const body = request.body

    const person = new Person({
      name: body.name,
      number: body.number,
    })

    personsArray = personsArray.concat(person)

    person.save()
    .then(note => {
      response.json(note)
    }).catch(error => next(error))
  })


  const error = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
  }

  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError' && error.kind == 'ObjectId') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  
    next(error)
  }

  app.use(error)
  app.use(errorHandler)


    

  const PORT = process.env.PORT
  app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


