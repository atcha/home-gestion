let db = require('../connection');

exports.list_all_users = (req, res) => {
    db.query('SELECT * FROM `user`', (error, results, fields) => {
        if(error) {
            res.send(error);
        } else {
            res.json(results);
        }
    });
};

exports.create_a_user = (req, res) => {
    db.query('INSERT INTO `user` SET ?', req.body, (error, result, fields) => {
        if(error) {
            res.send(error.sqlMessage);
        } else {
            res.json({ message: 'Store successfully created' });
        }
    });
};

exports.read_a_user = (req, res) => {
    db.query('SELECT * FROM `store` WHERE id = ?', req.params.storeId, (error, results, fields) => {
        if(error) {
            res.send(error);
        } else {
            res.json(results);
        }
    });
};

exports.update_a_user = (req, res) => {
    console.log(req.body);
    db.query('UPDATE user set ? WHERE id = ?',[req.body, req.params.storeId], (error, results) => {
        if (error) {
            res.send(error);
        } else {
            res.json('changed ' + results.changedRows + ' rows');
        }
    });
};


exports.delete_a_user = (req, res) => {
    db.query('DELETE FROM `user` WHERE id = ?', req.params.storeId, (error, results, fields) => {
        if (error) {
            res.send(error);
        } else {
            res.json({ message: 'User successfully deleted' });
        }
    });
};