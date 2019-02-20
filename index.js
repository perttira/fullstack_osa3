const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())

/* asetetaan backend käyttämään buildia. 
Kommentoi pois jos haluat käyttää development versiota (esim osa2) */
app.use(express.static('build'))


//    3.1 puhelinluettelon backend osa 1 && 3.2 puhelinluettelon backend osa 2
// && 3.3 puhelinluettelon backend osa 3 && 3.4 puhelinluettelon backend osa 4
// && 3.5 puhelinluettelon backend osa 5 && 3.6 puhelinluettelon backend osa 6
// && 3.7 puhelinluettelon backend osa 7 && 3.8* puhelinluettelon backend osa 8
// && 3.9 puhelinluettelon backend step9 && 3.10 puhelinluettelon backend step10
// && 3.11 puhelinluettelo full stack



const logger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

//:method :url :status :res[content-length] - :response-time ms
/*
morgan.token('type', function (req, res) { return 
  req.method, req.url, res.status :res[content-length] - :response-time ms
  req.headers['content-type'] })
*/
//morgan("default", tiny)

//var kissa = morgan.token('kissa', function(req, res){return req.headers['content-type']})
/*
morgan.token('content', function getContent (req, res) {
  var token_content = req.method + req.url + req.status + JSON.stringify(req.body)
  return token_content
})
*/
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
/*
app.use(bodyParser.json(), logger, morgan(':method :url :status :res[content-length] - :response-time ms')
)
*/
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

  /*   */
  const generateId = () => {
    //selvitetään olemassaolevista id:istä suurin muuttujaan maxId.
    // Uuden muistiinpanon id:ksi asetetaan sitten maxId+1.
    //const maxId = persons.length > 0 ? persons.map(n => n.id).sort((a,b) => a - b).reverse()[0] : 1
    //return maxId + 1
    return Math.floor(Math.random() * Math.floor(1000000000000000000000));
  }


  /*  */
  app.get('/api/persons', (req, res) => {
    console.log('persons.length', persons.length);
    res.json(persons)
  })

  
  /*   */
  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = persons.find(note => note.id === id)
    console.log('note', note);
    if ( note ) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  })

  
  /*   */
  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    
    // id:tä ei löytynyt jos filter palauttaa tyhjän taulukon
    if ( persons.filter(note => note.id === id).length != 0 ) {
      persons = persons.filter(note => note.id !== id)
      response.status(204).end()
    } else {
      response.status(404).end()
    }
  })


  /*   */
  app.get('/info', (req, res) => {
    console.log('persons.length', persons.length);
    //res.json(persons)
    var date = new Date()
    res.write("<div>Puhelinluettelossa "+persons.length +" henkilon tiedot</div>")
    res.write("<div>"+date+"</div>")
    res.end()
  })

  
  app.put('/api/persons/:id', (request, response) => {

    console.log('app.put() request.body', request.body);
    const body = request.body
    const newNote = {
      number: body.number,
    }
    if(persons.find(function(element) {
      return body.name === element.name;
    })){
    persons = persons.map(function(person){
      console.log('BACKEND app.put() body.name & body.number', body.name, body. number);

      if(person.name === body.name) {
        person.number = body.number
      }
      return person
    })
    console.log('BACKEND app.put() persons', persons);

    response.json(newNote)
   } else{
    return response.status(400).json({error: 'Did not find person from database'})

   }
  })

    

  
  /*   */
  app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.number === "" || body.content === "" ) {
      return response.status(400).json({error: 'Person name or number missing'})
    } else if (persons.filter(note => note.name === body.name).length != 0) {
      return response.status(400).json({error: 'Name must must unique'})
    }
  
    const newNote = {
      name: body.name,
      number: body.number,
      id: generateId()
    }
  
    persons = persons.concat(newNote)
    response.json(newNote)
  })
  
  const error = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}
  

  app.use(error)

/*
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
*/
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  })


