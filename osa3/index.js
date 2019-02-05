const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

// 3.1 puhelinluettelon backend osa 1 && 3.2 puhelinluettelon backend osa 2
// && 3.3 puhelinluettelon backend osa 3 && 3.4 puhelinluettelon backend osa 4
// && 3.5 puhelinluettelon backend osa 5 && 3.6 puhelinluettelon backend osa 6
// && 3.7 puhelinluettelon backend osa 7

const logger = (request, response, next) => {
  console.log('Method:',request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}


//morgan("default", tiny)

app.use(bodyParser.json(), logger, morgan('tiny'))

let notes = [
    {
      name: 'Kimmo Koskenkorva',
      number: '050-6667778',
      id: 1
    },
    {
      name: 'Mauri Muntteri',
      number: '040-4566543',
      id: 2
    },
    {
      name: 'Liisa Laudrup',
      number: '044-0451500',
      id: 3
    }
  ]

  /*   */
  const generateId = () => {
    //selvitetään olemassaolevista id:istä suurin muuttujaan maxId.
    // Uuden muistiinpanon id:ksi asetetaan sitten maxId+1.
    //const maxId = notes.length > 0 ? notes.map(n => n.id).sort((a,b) => a - b).reverse()[0] : 1
    //return maxId + 1
    return Math.floor(Math.random() * Math.floor(1000000000000000000000));
  }


  /*   */
  app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)

    if ( note ) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  })

  
  /*   */
  app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    
    // id:tä ei löytynyt jos filter palauttaa tyhjän taulukon
    if ( notes.filter(note => note.id === id).length != 0 ) {
      notes = notes.filter(note => note.id !== id)
      response.status(204).end()
    } else {
      response.status(404).end()
    }
  })


  /*  */
  app.get('/api/notes', (req, res) => {
    console.log('notes.length', notes.length);
    res.json(notes)
  })


  /*   */
  app.get('/info', (req, res) => {
    console.log('notes.length', notes.length);
    //res.json(notes)
    var date = new Date()
    res.write("<div>Puhelinluettelossa "+notes.length +" henkilon tiedot</div>")
    res.write("<div>"+date+"</div>")
    res.end()
  })

  
  /*   */
  app.post('/api/notes', (request, response) => {
    const body = request.body
  
    /*
    var filteredNotes = notes.filter(function (note) {
      console.log("note.number: ",note.number,"typeof note.number: ", typeof note.number,"body.number: ", body.number,"typeof body.number: ", typeof body.number, note.number === body.number)

      note.number != body.number

    })
*/

    if (body.number === "" || body.content === "" ) {
      return response.status(400).json({error: 'Person name or number missing'})
    } else if (notes.filter(note => note.name === body.content).length != 0) {
      return response.status(400).json({error: 'Name must must unique'})
    }
  
    const note = {
      name: body.content,
      //important: body.important|| false,
      //date: new Date(),
      number: body.number,
      id: generateId()
    }
  
    notes = notes.concat(note)
    response.json(note)
  })
  
  const error = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
  }
  
  app.use(error)

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

