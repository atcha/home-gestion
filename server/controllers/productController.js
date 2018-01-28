let db = require('../connection');

exports.list_all_products = (req, res) => {
    db.query('SELECT * FROM `product`', (error, results, fields) => {
        if(error) {
            res.send(error);
        } else {
            res.json(results);
        }
    });
};

exports.create_a_product = (req, res) => {
    db.query('INSERT INTO `product` SET ?', req.body, (error, result, fields) => {
        if(error) {
            res.send(error.sqlMessage);
        } else {
            db.query('SELECT * FROM `product` WHERE id = ?', result.insertId, (error, results, fields) => {
                if(error) {
                    res.send(error);
                } else {
                    res.json(results);
                }
            });
        }
    });
};

exports.read_a_product = (req, res) => {
    db.query('SELECT * FROM `product` WHERE id = ?', req.params.productId, (error, results, fields) => {
        if(error) {
            res.send(error);
        } else {
            res.json(results);
        }
    });
};

exports.read_a_productbyname = (req, res) => {
    db.query('SELECT * FROM `product` WHERE label = ?', req.params.productName, (error, results, fields) => {
        if(error) {
            res.send(error);
        } else {
            res.json(results);
        }
    });
};