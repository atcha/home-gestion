const mysql  = require('mysql')
const config = require('../config')

let state = {
  pool: null
}

exports.connect = function (done) {
  state.pool = mysql.createPool({
    host     : config.sql.host,
    user     : config.sql.user,
    password : config.sql.password,
    database : config.sql.database
  })

  done
}

exports.READ = 'read'
exports.WRITE = 'write'

exports.get = function (type, done) {
  var pool = state.pool
  if (!pool) return done(new Error('Missing database connection.'))

  if (type === exports.WRITE) {
    state.pool.getConnection('WRITE', function (err, connection) {
      if (err) return done(err)
      done(null, connection)
    })
  } else {
    state.pool.getConnection('READ*', function (err, connection) {
      if (err) return done(err)
      done(null, connection)
    })
  }
}

exports.fixtures = function(data) {
  var pool = state.pool
  if (!pool) return done(new Error('Missing database connection.'))

  var names = Object.keys(data.tables)
  async.each(names, function(name, cb) {
    async.each(data.tables[name], function(row, cb) {
      var keys = Object.keys(row)
        , values = keys.map(function(key) { return "'" + row[key] + "'" })

      pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb)
    }, cb)
  }, done)
}

exports.drop = function(tables, done) {
  var pool = state.pool
  if (!pool) return done(new Error('Missing database connection.'))

  async.each(tables, function(name, cb) {
    pool.query('DELETE * FROM ' + name, cb)
  }, done)
}



