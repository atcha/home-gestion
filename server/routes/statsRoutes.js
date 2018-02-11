module.exports = (app) => {
    let stats = require('../controllers/statsController');


    // Purchases Routes
    // app.route('/stat/purchases')
    //     .get(purchases.list_all_purchases)
    //     .post(purchases.create_a_purchase);

    app.route('/stats/products/count')
        .get(stats.read_purchases_nbproducts);

    app.route('/stats/products/count/months')
        .get(stats.read_purchases_nbproductsbymonths);

    app.route('/stats/products/bought')
        .get(stats.list_all_boughtproducts);

    app.route('/stats/products/count/stores')
        .get(stats.read_purchases_nbproductsbystore);
}