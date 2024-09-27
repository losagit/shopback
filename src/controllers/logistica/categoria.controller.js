const conn = require('../../config/database');
const ctrl = {};

ctrl.list = (req, res) => {
    const {id} = req.params;
    const sql = `SELECT * FROM Categorias ct
    where id_empresa = ?`
    conn.query(sql,[id] ,(err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
}

ctrl.create = (req, res) => {

    const sql = `INSERT INTO Categorias set ?`
    conn.query(sql, req.body, (err, result) => {
        if (!err) {
            console.log('guardado con exito');
        } else {
            console.log(err);
        }
    })
}
ctrl.edit = (req, res) => {
    const { id } = req.params;
    conn.query('UPDATE Categorias SET ? WHERE id_categoria = ?', [req.body, id], (err, result) => {
        if (!err) {
            console.log('editado con exito');
        } else {
            console.log(err);
        }
    })
}

ctrl.remove = (req, res) => {
    const { id } = req.params;
    conn.query('DELETE from Categorias WHERE id_categoria = ?', [id], (err, result) => {
        if (!err) {
            console.log('eliminado con exito');
        } else {
            console.log(err);
        }
    })
}

module.exports = ctrl;