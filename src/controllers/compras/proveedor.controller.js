const conn = require('../../config/database');
const ctrl = {};

ctrl.list = (req, res) => {
    const {id} = req.params;
    const query = `SELECT * FROM Proveedores where id_empresa = ?`
    conn.query(query,[id],(err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    })
}

ctrl.create = (req, res) => {

    conn.query('INSERT INTO Proveedores SET ?', req.body, (err, result) => {
        if (!err) {
            console.log('guardado con exito');
        } else {
            console.log(err);
        }
    })
}
ctrl.edit = (req, res) => {
    const { id } = req.params;
    console.log(id);
    conn.query('UPDATE Proveedores SET ? WHERE id_proveedor = ?', [req.body, id], (err, result) => {
        if (!err) {
            console.log('editado con exito');
        } else {
            console.log(err);
        }
    })
}

ctrl.remove = (req, res) => {
    const { id } = req.params;
    conn.query('DELETE from Proveedores WHERE id_proveedor = ?', [id], (err, result) => {
        if (!err) {
            console.log('eliminado con exito');
        } else {
            console.log(err);
        }
    })
}

module.exports = ctrl;