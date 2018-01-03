const db = require('./db')

// Fake controller
class Shelving {
  static  index(req, res) {
    db.get(db.READ, function (err, connection) {
      if (err) return done('Database problem')

      connection.query('SELECT * FROM shelving', function (err, rows) {
        if (err) return done('Database problem')
        res.send(rows)
      })
    })
  }
  static  show(req, res) {
    db.get(db.READ, function (err, connection) {
      if (err) return done('Database problem')

      connection.query('SELECT * FROM shelving WHERE id = ?', req.params.id, function (err, rows) {
        if (err) return done('Database problem')
        res.send(rows || { error: 'Cannot find shelving' })
      })
    })
  }
  static  destroy(req, res, id) {
    var destroyed = id in shelvings;
    delete shelvings[id];
    res.send(destroyed ? 'destroyed' : 'Cannot find shelving')
  }
  static  range (req, res, a, b, format) {
    const range = shelvings.slice(a, b + 1)
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
module.exports.addShelvingResources = function(app, path) {
  app.get(path, Shelving.index)
  app.get(path + '/:a..:b.:format?', (req, res) => {
    var a = parseInt(req.params.a, 10)
    var b = parseInt(req.params.b, 10)
    var format = req.params.format
    Shelving.range(req, res, a, b, format)
  })
  app.get(path + '/:id', Shelving.show)
  app.delete(path + '/:id', (req, res) => {
    var id = parseInt(req.params.id, 10)
    Shelving.destroy(req, res, id)
  })
}

