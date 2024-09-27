const conn = require('../../config/database');
const ctrl = {};

ctrl.list = (req, res) => {
    const {id} = req.params;
    const query = `select * from Clientes where id_empresa = ?`
    conn.query(query, [id],(err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
}

ctrl.create = (req, res) => {

    conn.query('INSERT INTO Clientes set ?', req.body, (err, result) => {
        if (!err) {
            console.log('guardado con exito');
            const idCliente = result.insertId;
            res.json(idCliente);
        } else {
            console.log(err);
        }
    })
}
ctrl.edit = (req, res) => {
    const { id } = req.params;
    console.log(id);
    conn.query('UPDATE Clientes SET ? WHERE id_Cliente = ?', [req.body, id], (err, result) => {
        if (!err) {
            console.log('editado con exito');
        } else {
            console.log(err);
        }
    })
}

ctrl.remove = (req, res) => {
    const { id } = req.params;
    conn.query('DELETE from Clientes WHERE id_Cliente = ?', [id], (err, result) => {
        if (!err) {
            console.log('eliminado con exito');
        } else {
            console.log(err);
        }
    })
}

module.exports = ctrl;