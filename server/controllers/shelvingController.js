let db = require('../connection');

exports.list_all_shelves = (req, res) => {
    db.query('SELECT * FROM `shelving`', (error, results, fields) => {
        if(error)
            res.send(error);
        res.json(results);
    });
};

exports.create_a_shelve = (req, res) => {
    db.query('INSERT INTO `shelving` SET ?', req.body, (error, results, fields) => {
        if(error) {
            res.send(error.sqlMessage);
        }
        res.json(results.insertId);
    });
};

exports.read_a_shelve = (req, res) => {
    db.query('SELECT * FROM `shelving` WHERE id = ?', req.params.shelvingId, (error, results, fields) => {
        if(error)
            res.send(error);
        res.json(results);
    });
};

exports.update_a_shelve = (req, res) => {
    db.query('UPDATE `shelving` set ? WHERE id = ?',[req.body, req.params.shelvingId], (error, results) => {
        if (error)
            res.send(error);
        console.log('changed ' + results.changedRows + ' rows');
    });
};


exports.delete_a_shelve = function(req, res) {
    db.query('DELETE FROM `shelving` WHERE id = ?', req.params.shelvingId, (error, results, fields) => {
        if (error)
            res.send(error);
        res.json({ message: 'shelving successfully deleted' });
    });
};

