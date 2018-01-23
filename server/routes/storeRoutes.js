module.exports = (app) => {
    let stores = require('../controllers/storeController');

    // Store Routes
    app.route('/stores')
       .get(stores.list_all_stores)
       .post(stores.create_a_store);

    app.route('/stores/:storeId')
        .get(stores.read_a_store)
        .put(stores.update_a_store)
        .delete(stores.delete_a_store);
}