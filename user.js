const pool = require('./pool');

module.exports = {
    login: (req, res) => {
        let uname = req.body.uname;
        let upwd = req.body.upwd;
        pool.getConnection((err, conn) => {
            conn.query('SELECT * FROM sl_user WHERE uname=? AND upwd=?', [uname, upwd], (err, result) => {
                let data = {};
                if (err) {
                    data = {code: 500, msg: 'sql err'}
                } else if (result.length === 0) {
                    data = {code: 400, msg: 'uname or upwd err'}
                } else {
                    data = {code: 100, msg: 'login success', uid: result[0].uid, uname: result[0].uname};
                }
                res.json(data);
                conn.release();
            })
        })
    },
    register: (req, res) => {
        let uname = req.body.uname;
        let upwd = req.body.upwd;
        pool.getConnection((err, conn) => {
            let data = {};
            //判断用户名是否存在
            conn.query('SELECT uname FROM sl_user WHERE uname=?', [uname], (err, result) => {
                if (result.length !== 0) {
                    data = {code: 500, msg: 'username exists'};
                    res.json(data);
                }else {
                    //添加用户
                    conn.query('INSERT INTO sl_user VALUES(NULL,?,?)', [uname, upwd], (err, result) => {
                        if (result.affectedRows === 1) {//判断添加的行数
                            data = {code: 200, msg: 'register success'}
                        } else {
                            data = {code: 500, msg: 'register err'}
                        }
                        res.json(data);
                    })
                }
                conn.release();
            });
        })
    }
};