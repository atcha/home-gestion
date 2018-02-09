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