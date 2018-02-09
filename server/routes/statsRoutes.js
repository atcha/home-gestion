module.exports = (app) => {
    let purchases = require('../controllers/statsController');


    // Purchases Routes
    // app.route('/stat/purchases')
    //     .get(purchases.list_all_purchases)
    //     .post(purchases.create_a_purchase);

    app.route('/stats/products/count')
        .get(purchases.read_purchases_nbproducts);

    app.route('/stats/products/count/months')
        .get(purchases.read_purchases_nbproductsbymonths);
}