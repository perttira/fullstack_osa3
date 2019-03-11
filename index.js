const app = require('./app') // varsinainen Express-sovellus
const http = require('http')
const config = require('./utils/config')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})

//   3.1 puhelinluettelon backend osa 1 && 3.2 puhelinluettelon backend osa 2
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
