require('colors')

const Server = require('./server').Server
const addUserResources = require('./users').addUserResources
const addStoreRessources = require('./stores').addStoreResources
const config = require('../config')

let server = new Server(config)

addUserResources(server.app, config.apiPath + '/users')
addStoreRessources(server.app, config.apiPath + '/stores')

server.run().then( () => {
  console.log(' Server listen at ' + config.port.toString().bold)
})
