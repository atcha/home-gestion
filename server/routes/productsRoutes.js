module.exports = (app) => {
    let products = require('../controllers/productController');

    // Purchases Routes
    app.route('/products')
        .get(products.list_all_products)
        .post(products.create_a_product);

    app.route('/products/:productId')
        .get(products.read_a_product);

    app.route('/products/name/:productName')
        .get(products.read_a_productbyname);
}