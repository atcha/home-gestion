const db = require('./db')

// Fake controller
class Store {
  static  index(req, res) {
    db.get(db.READ, function (err, connection) {
      if (err) return done('Database problem')

      connection.query('SELECT * FROM store', function (err, rows) {
        res.send(rows)
      })
    })
  }
  static  show(req, res) {
    db.get(db.READ, function (err, connection) {
      if (err) return done('Database problem')

      connection.query('SELECT * FROM store WHERE id = ?', req.params.id, function (err, rows) {
        res.send(rows || { error: 'Cannot find store' })
      })
    })
  }
  static  destroy(req, res, id) {
    var destroyed = id in stores;
    delete stores[id];
    res.send(destroyed ? 'destroyed' : 'Cannot find store')
  }
  static  range (req, res, a, b, format) {
    const range = stores.slice(a, b + 1)
    switch (format) {
      case 'json':
        res.send(range)
        break
      case 'html':
      default:
        var html = '<ul>' + range.map(user => {
          return '<li>' + user.name + '</li>'
        }).join('\n') + '</ul>'
        res.send(html)
        break
    }
  }
}

// Ad-hoc example resource method
module.exports.addStoreResources = function(app, path) {
  app.get(path, Store.index)
  app.get(path + '/:a..:b.:format?', (req, res) => {
    var a = parseInt(req.params.a, 10)
    var b = parseInt(req.params.b, 10)
    var format = req.params.format
    Store.range(req, res, a, b, format)
  })
  app.get(path + '/:id', Store.show)
  app.delete(path + '/:id', (req, res) => {
    var id = parseInt(req.params.id, 10)
    Store.destroy(req, res, id)
  })
}

