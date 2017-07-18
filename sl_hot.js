const pool = require('./pool');

module.exports = {
    content: (req, res) => {
        pool.getConnection((err, conn) => {
            conn.query('SELECT p.pid,p.pname,p.purl,p.likeNum,p.uid,u.uname FROM sl_pic p,sl_user u WHERE p.uid=u.uid',
                (err, result) => {
                    res.json(result);
                    conn.release();
                })
        })
    },
    iLike: (req, res) => {
        let uid = req.body.uid;
        pool.getConnection((err, conn) => {
            conn.query('SELECT * FROM sl_like WHERE uid=?', [uid], (err, result) => {
                res.json(result);
                conn.release();
            })
        })
    },
    collect: (req, res) => {
        let uid = req.body.uid;
        let pid = req.body.pid;
        pool.getConnection((err, conn) => {
            let data = {};
            conn.query('SELECT * FROM sl_like WHERE uid=? AND pid=?', [uid, pid], (err, result) => {
                if (result.length !== 0) {
                    data = {code: 500, msg: 'collect exists'};
                    res.json(data);
                } else {
                    conn.query('INSERT INTO sl_like VALUES(NULL,?,?)', [uid, pid], (err, result) => {
                        if (result.affectedRows === 1) {//判断添加的行数
                            conn.query('UPDATE sl_pic SET likeNum=likeNum+1 WHERE pid=?', [pid], (err, result) => {
                                if (result.affectedRows === 1) {
                                    data = {code: 200, msg: 'collect success'};
                                    res.json(data);
                                }
                            })
                        } else {
                            data = {code: 500, msg: 'collect err'};
                            res.json(data);
                        }
                    })
                }
                conn.release();
            })
        })
    },
    search: (req, res) => {
        let kw = req.body.kw;
        let data = {};
        pool.getConnection((err, conn) => {
            conn.query("SELECT pname FROM sl_pic LIKE '%?%'", [kw], (err, result) => {
                data = result;
            });
        })
    }
};