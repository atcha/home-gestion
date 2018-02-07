let db = require('../connection');

exports.list_all_purchases = (req, res) => {
    db.query('SELECT * FROM `purchase`', (error, purchases, fields) => {
        if(error) {
            res.send(error);
        } else {
            res.send(purchases);
        }
    });
};

exports.create_a_purchase = (req, res) => {
    console.log(req.body);
    let formatedPurchase = {
        id_product: '',
        id_store: '',
        id_shelving: '',
        price: '',
        weight_price: '',
        purchase_date: ''

    };
    formatedPurchase.id_product = req.body.product.id;
    formatedPurchase.price = req.body.price;
    formatedPurchase.weight_price = req.body.price;
    formatedPurchase.purchase_date = req.body.date;
    db.query('SELECT id FROM `store` WHERE value = ?', req.body.store.value, (error, store, fields) => {
        if(error) {
             res.send(error.sqlMessage);
        }
        formatedPurchase.id_store = store[0].id;
        req.body.shelve.forEach((shelve) => {
            db.query('SELECT id FROM `shelving` WHERE value = ?', shelve, (error, shelve, fields) => {
                formatedPurchase.id_shelving = shelve[0].id;
                db.query('INSERT INTO `purchase` SET ?', formatedPurchase, (error, result, fields) => {
                    if(error) {
                        res.send(error.sqlMessage);
                    }
                });
            })
        });
    });
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

exports.read_purchases_shelves = (req, res) => {
    db.query('SELECT DISTINCT shelving.id, shelving.label, shelving.value FROM `shelving`\n'+
        'JOIN `product_shelving_store` AS pss on pss.id_shelving = shelving.id\n'+
        'JOIN `purchase` ON purchase.id_product = pss.id_product\n'+
        'WHERE purchase.id = ?', req.params.purchaseId, (error, shelves, fields) => {
        if (error) {
            res.send(error);
        } else {
            res.json(shelves);
        }
    });
};


