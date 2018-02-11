module.exports = (app) => {
    let products = require('../controllers/authController');

    // Purchases Routes
    app.route('/auth/:provider')
        .post(products.prodiver_auth);
}