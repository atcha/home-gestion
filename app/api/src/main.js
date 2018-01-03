require('colors')

const Server = require('./server').Server
const addUserResources = require('./users').addUserResources
const config = require('../config')

let server = new Server(config)

addUserResources(server.app, config.apiPath + '/users')

server.run().then( () => {
  console.log(' Server listen at ' + config.port.toString().bold)

  server.getDbConnection().connect();

  server.getDbConnection().query('SELECT * FROM `store`', function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows);
  });

  server.getDbConnection().end();
})
