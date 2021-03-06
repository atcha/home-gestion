// server
let express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    cors = require('cors');

// Models
// let product = require('./models/product'),
//     shelving = require('./models/shelving'),
//     store = require('./models/store'),
//     purchase = require('./models/purchase');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let storesRoutes = require('./routes/storeRoutes'),
    shelvingRoutes = require('./routes/shelvingRoutes'),
    productsRoutes = require('./routes/productsRoutes'),
    purchasesRoutes = require('./routes/purchasesRoutes'),
    statsRoutes = require('./routes/statsRoutes'),
    userRoutes = require('./routes/userRoutes');

storesRoutes(app);
shelvingRoutes(app);
productsRoutes(app);
purchasesRoutes(app);
statsRoutes(app);
userRoutes(app);

app.listen(port);

console.log('home gestion RESTful API server started on: ' + port);