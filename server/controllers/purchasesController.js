let db = require('../connection'),
    store = require('');

exports.list_all_purchases = (req, res) => {
    db.query('SELECT * FROM `store`', (error, results, fields) => {
        if(error) {
            res.send(error);
        } else {
            res.json(results);
        }
    });
};

exports.create_a_purchase = (req, res) => {
    db.query('INSERT INTO `purchase` SET ?', req.body, (error, result, fields) => {
        if(error) {
            res.send(error.sqlMessage);
        } else {
            db.query('SELECT * FROM `store` WHERE id = ?', result.insertId, (error, results, fields) => {
                if(error) {
                    res.send(error);
                } else {
                    res.json(results);
                }
            });
        }
    });
};

exports.read_a_purchase = (req, res) => {
    db.query('SELECT * FROM `store` WHERE id = ?', req.params.storeId, (error, results, fields) => {
        if(error) {
            res.send(error);
        } else {
            res.json(results);
        }
    });
};

exports.update_a_purchase = (req, res) => {
    console.log(req.body);
    db.query('UPDATE store set ? WHERE id = ?',[req.body, req.params.storeId], (error, results) => {
        if (error) {
            res.send(error);
        } else {
            res.json('changed ' + results.changedRows + ' rows');
        }
    });
};


exports.delete_a_purchase = (req, res) => {
    db.query('DELETE FROM `store` WHERE id = ?', req.params.storeId, (error, results, fields) => {
        if (error) {
            res.send(error);
        } else {
            res.json({ message: 'Store successfully deleted' });
        }
    });
};

