

// server
let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');

// Models
// let product = require('./models/product'),
//     shelving = require('./models/shelving'),
//     store = require('./models/store'),
//     purchase = require('./models/purchase');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// let purchasesRoutes = require('./routes/purchasesRoutes'),
let storesRoutes = require('./routes/storeRoutes'),
    shelvingRoutes = require('./routes/shelvingRoutes');

// purchasesRoutes(app);
storesRoutes(app);
shelvingRoutes(app);

app.listen(port);

console.log('home gestion RESTful API server started on: ' + port);