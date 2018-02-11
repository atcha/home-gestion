let db = require('../connection');

exports.read_purchases_nbproducts = (req, res) => {
    db.query('SELECT po.label, COUNT(po.id) AS nb\n' +
            'FROM `product` po, `purchase` pu\n' +
            'WHERE po.id = pu.id_product\n' +
            'GROUP BY po.label', (error, results, fields) => {
        if(error) {
            res.send(error);
        } else {
            res.json(results);
        }
    });
}

exports.read_purchases_nbproductsbymonths = (req, res) => {
    db.query('SELECT MONTH(purchase.purchase_date) AS month, COUNT(product.id) AS nb\n' +
            'FROM `product`, `purchase`\n' +
            'WHERE product.id = purchase.id_product\n' +
            'GROUP BY month', (error, results, fields) => {
        if(error) {
            res.send(error);
        } else {
            res.json(results);
        }
    });
}

exports.list_all_boughtproducts = (req, res) => {
    db.query('SELECT DISTINCT product.label AS label, product.id AS value\n' +
        'FROM `product`, `purchase`\n' +
        'WHERE product.id = purchase.id_product', (error, results) => {
        if(error) {
            res.send(error);
        } else {
            res.json(results);
        }
    });
}

exports.read_purchases_nbproductsbystore = (req, res) => {
    db.query('SELECT product.label productLabel, store.label as label, count(product.id) as nb\n' +
        'FROM `product`\n' +
        'JOIN `purchase` ON product.id = purchase.id_product\n' +
        'JOIN `store` ON store.id = purchase.id_store\n' +
        'WHERE product.id = '+ req.query.product + '\n' +
        'GROUP BY store.id ', (error, results) => {
        if(error) {
            res.send(error);
        } else {
            res.json(results);
        }
    });
}