require('colors')

const Server = require('./server').Server
const addUserResources = require('./users').addUserResources
const addStoreResources = require('./stores').addStoreResources
const addShelvingResources = require('./shelvings').addShelvingResources
const config = require('../config')

let server = new Server(config)

addUserResources(server.app, config.apiPath + '/users')
addStoreResources(server.app, config.apiPath + '/stores')
addShelvingResources(server.app, config.apiPath + '/shelvings')

server.run().then( () => {
  console.log(' Server listen at ' + config.port.toString().bold)
})
