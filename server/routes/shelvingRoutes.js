module.exports = (app) => {
    let shelves = require('../controllers/shelvingController');

    // Store Routes
    app.route('/shelves')
        .get(shelves.list_all_shelves)
        .post(shelves.create_a_shelve);

    app.route('/shelves/:shelveId')
        .get(shelves.read_a_shelve)
        .put(shelves.update_a_shelve)
        .delete(shelves.delete_a_shelve);
}