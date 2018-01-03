// Fake records
const stores = [
  { name: 'monop', label: 'Monoprix' }
  , { name: 'carrefour', label: 'Carrefour' }
  , { name: 'leopold', labe: 'Leopold' }
]

// Fake controller
class Store {
  static  index(req, res) {
    res.send(stores)
  }
  static  show(req, res) {
    res.send(stores[req.params.id] || { error: 'Cannot find user' })
  }
  static  destroy(req, res, id) {
    var destroyed = id in stores;
    delete stores[id];
    res.send(destroyed ? 'destroyed' : 'Cannot find user')
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

