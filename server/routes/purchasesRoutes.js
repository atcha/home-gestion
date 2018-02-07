module.exports = (app) => {
    let purchases = require('../controllers/purchasesController');

    // Purchases Routes
    app.route('/purchases')
        .get(purchases.list_all_purchases)
        .post(purchases.create_a_purchase);

    app.route('/purchases/:purchaseId')
        .get(purchases.read_a_purchase)
        .put(purchases.update_a_purchase)
        .delete(purchases.delete_a_purchase);

    app.route('/purchases/:purchaseId/shelves')
        .get(purchases.read_purchases_shelves);
}