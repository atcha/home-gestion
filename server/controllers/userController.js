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
    db.query('INSERT INTO `user` SET ?', req.body, (error, result) => {
        if(error) {
            res.send(error.sqlMessage);
        } else {
            db.query('SELECT * FROM `user` WHERE id = ?', result.insertId, (error, results) => {
                if(error) {
                    res.send(error);
                } else {
                    res.json(results);
                }
            });
        }
    });
};

exports.read_a_user = (req, res) => {
    db.query('SELECT * FROM `user` WHERE uid = ?', req.params.uid, (error, results, fields) => {
        if(error) {
            res.send(error);
        } else {
            res.json(results);
        }
    });
};

exports.update_a_user = (req, res) => {
    db.query('UPDATE user set ? WHERE uid = ?',[req.body, req.params.uid], (error, results) => {
        if (error) {
            res.send(error);
        } else {
            res.json('changed ' + results.changedRows + ' rows');
        }
    });
};


exports.delete_a_user = (req, res) => {
    db.query('DELETE FROM `user` WHERE uid = ?', req.params.uid, (error, results, fields) => {
        if (error) {
            res.send(error);
        } else {
            res.json({ message: 'User successfully deleted' });
        }
    });
};