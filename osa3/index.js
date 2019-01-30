const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// 3.1 puhelinluettelon backend osa 1


app.use(bodyParser.json())

let notes = [
    {
      name: 'Kimmo Koskenkorva',
      number: '050-6667778',
      id: 1
    },
    {
      name: 'Mauri Muntteri',
      number: '040-4566543',
      id: 1
    },
    {
      name: 'Liisa Laudrup',
      number: '044-0451500',
      id: 1
    }
  ]
  
  app.get('/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const note = notes.find(note => note.id === id)
    console.log(note)
    
    if ( note ) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  })
  
  app.delete('/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
  })
  
  app.get('/api/notes', (req, res) => {
    res.json(notes)
  })

  const generateId = () => {
    const maxId = notes.length > 0 ? notes.map(n => n.id).sort((a,b) => a - b).reverse()[0] : 1
    return maxId + 1
  }
  
  app.post('/notes', (request, response) => {
    const body = request.body
  
    if (body.content === undefined) {
      return response.status(400).json({error: 'content missing'})
    }
  
    const note = {
      content: body.content,
      important: body.important|| false,
      date: new Date(),
      id: generateId()
    }
  
    notes = notes.concat(note)
  
    response.json(note)
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })