module.exports = (app) => {
    let stores = require('../controllers/userController');

    // Store Routes
    app.route('/users')
        .get(stores.list_all_users)
        .post(stores.create_a_user);

    app.route('/users/:uid')
        .get(stores.read_a_user)
        .put(stores.update_a_user)
        .delete(stores.delete_a_user);
}