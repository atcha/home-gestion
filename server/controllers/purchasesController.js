let db = require('../connection');

exports.list_all_purchases = (req, res) => {
    db.query('SELECT purchase.id, ' +
        'product.label AS name, ' +
        'purchase.price, ' +
        'purchase.weight_price AS weightPrice, ' +
        'shelving.label AS shelveLabel, ' +
        'store.label AS storeLabel, ' +
        'purchase.purchase_date\n' +
        'FROM `purchase`\n' +
        'INNER JOIN product ON product.id = purchase.id_product\n' +
        'INNER JOIN store ON store.id = purchase.id_store\n' +
        'INNER JOIN shelving ON shelving.id = purchase.id_shelving', (error, results, fields) => {
        if(error) {
            res.send(error);
        } else {
            res.json(results);
        }
    });
};

exports.create_a_purchase = (req, res) => {
    console.log(req.body.product.id);
    if(!req.body.product.id) {

    } else {

    }
    // db.query('INSERT INTO `purchase` SET ?', req.body, (error, result, fields) => {
    //     if(error) {
    //         res.send(error.sqlMessage);
    //     } else {
    //         db.query('SELECT * FROM `store` WHERE id = ?', result.insertId, (error, results, fields) => {
    //             if(error) {
    //                 res.send(error);
    //             } else {
    //                 res.json(results);
    //             }
    //         });
    //     }
    // });
};

exports.read_a_purchase = (req, res) => {
    db.query('SELECT * FROM `purchase` WHERE id = ?', req.params.storeId, (error, results, fields) => {
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

