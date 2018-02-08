module.exports = (app) => {
    let purchases = require('../controllers/statsController');


    // Purchases Routes
    app.route('/stat/purchases')
        .get(purchases.list_all_purchases)
        .post(purchases.create_a_purchase);

    app.route('/stats/products')
        .get(purchases.read_a_purchase)
        .put(purchases.update_a_purchase)
        .delete(purchases.delete_a_purchase);

    app.route('/purchases/stores')
        .get(purchases.read_purchases_shelves);
}