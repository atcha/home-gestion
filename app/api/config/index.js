var path = require('path')
var clientConfig = require('../../config')

module.exports = {

  client: clientConfig,

  // Proxy your API if using any.
  // Also see /build/script.dev.js and search for "proxy api requests"
  // https://github.com/chimurai/http-proxy-middleware
  proxyTable: {},

  port: 8181,

  apiPath: '/api',

  sql: {
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'home_gestion'
  }
}

/*
 * proxyTable example:
 *
   proxyTable: {
      // proxy all requests starting with /api
      '/api': {
        target: 'https://some.address.com/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
 */
