const notesRouter = require('express').Router()
const Person = require('../models/person')
var personsArray




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
// 3.21 tietokantaa käyttävä versio internettiin && osa 4 mukaan tehty refactorointi noden käytäntöjen mukaisesti


/**
 * Random generator
 * @param {TYPE} arg
 * @return {!Array<TYPE>}
 * @template TYPE
 */
notesRouter.get('/', (request, response) => {

  Person.find({}).then(notes => {
    personsArray = notes.map(note => note.toJSON())
    console.log('personsArray', personsArray)
    response.json(personsArray)
  })
})


/**
 * Random generator
 * @param {TYPE} arg
 * @return {!Array<TYPE>}
 * @template TYPE
 */

notesRouter.get('/:id', (request, response, next) => {
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
notesRouter.delete('/:id', (request, response, next) => {
// id:tä ei löytynyt jos filter palauttaa tyhjän taulukon
  personsArray.map(note => console.log('note.id', note.id))

  if ( personsArray.filter(note => note.id == request.params.id).length != 0 ) {
    personsArray = personsArray.filter(note => note.id != request.params.id)

    Person.findByIdAndRemove(request.params.id, (err, person) => {
      if (err) return response.status(500).send(err)
      return response.status(204).end()
    }).catch(error => next(error))
  } else {
    response.status(404).end()
  }
})


/*   */
notesRouter.get('/info', (req, res) => {
  //var date = new Date()
  res.write(' <div>Puhelinluettelossa ,', + personsArray.length + ',henkilon tiedot</div>')
  res.write('<div>"+date+"</div>')
  res.end()
})

notesRouter.put('/:id', (request, response, next) => {

  const body = request.body

  if(personsArray.find(function(element) {
    return request.params.id == element.id
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
notesRouter.post('/', (request, response, next) => {

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


module.exports = notesRouter








